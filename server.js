import express from 'express';
import ViteExpress from 'vite-express';
import formidable from 'express-formidable';
import methodOverride from 'method-override';
import { buildMiddleware as turboStream } from './src/middleware/turbo-stream.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './src/views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(turboStream()); // Use custom Turbo Stream middleware
app.use(formidable()); // Collect data from form submissions
app.use(methodOverride('_method')); // Allow DELETE requests

import RoomService from './src/services/room-service.js';
import messagesRouter from './src/api/messages.js';

app.get('/', (_req, res) => {
  res.render('index', {
    rooms: RoomService.all(),
  });
});

app.use('/', messagesRouter);

ViteExpress.listen(app, PORT, () => console.log('Server is listening...'));
