const MiddlewareWriteMode = {
  SEND: 0,
  WRITE: 1,
};

const ResponseWriteMode = {
  WRITE: 0,
  SEND: 1,
};

const TurboStreamActions = {
  append: 'append',
  prepend: 'prepend',
  replace: 'replace',
  update: 'update',
  remove: 'remove',
};

// Render a partial view with locals, returning a Promise
const render = (res, partial, locals) =>
  new Promise((resolve, reject) => {
    res.render(partial, locals, (err, html) => {
      if (err) reject(err);
      else resolve(html);
    });
  });

// Check if options contain a content string
const isContentStreamOptions = (options) =>
  typeof options?.content === 'string';

// Get content from options (either a string or rendered partial)
const getContentFromOptions = async (res, options) => {
  if (!options) return '';
  if (isContentStreamOptions(options)) return options.content;
  return render(res, options.partial, options.locals);
};

// Generate a Turbo Stream response
const stream = async (res, target, action, options) => {
  const content = await getContentFromOptions(res, options);
  return `
    <turbo-stream action="${action}" target="${target}">
      <template>
${content}
      </template>
    </turbo-stream>
  `;
};

// Express middleware to add turboStream to response
const middleware = (_req, res, next) => {
  const streamActionHandler = (action, writeMode) => async (target, options) => {
    res.setHeader('Content-Type', 'text/vnd.turbo-stream.html');
    const turboStreamHtml = await stream(res, target, action, options);
    if (writeMode === ResponseWriteMode.SEND) {
      res.send(turboStreamHtml);
    } else {
      res.write(turboStreamHtml);
    }
  };

  const createTurboStream = (writeMode) => ({
    append: streamActionHandler(TurboStreamActions.append, writeMode),
    prepend: streamActionHandler(TurboStreamActions.prepend, writeMode),
    replace: streamActionHandler(TurboStreamActions.replace, writeMode),
    update: streamActionHandler(TurboStreamActions.update, writeMode),
    remove: streamActionHandler(TurboStreamActions.remove, writeMode),
  });

  const turboStream = createTurboStream(ResponseWriteMode.SEND);
  const turboStreamWithMultiple = {
    ...turboStream,
    multiple: async (callback) => {
      const writeModeTurboStream = createTurboStream(ResponseWriteMode.WRITE);
      // Collect promises from the callback
      const promises = [];
      // Proxy to collect all promises returned by each action
      const proxy = new Proxy(writeModeTurboStream, {
        get(target, prop) {
          if (typeof target[prop] === 'function') {
            return (...args) => {
              const result = target[prop](...args);
              promises.push(result);
              return result;
            };
          }
          return target[prop];
        }
      });
      await callback(proxy);
      await Promise.all(promises);
      res.end();
    },
  };

  res.turboStream = turboStreamWithMultiple;
  next();
};

// Factory function to return the middleware
const buildMiddleware = () => middleware;

export { MiddlewareWriteMode, middleware, buildMiddleware };