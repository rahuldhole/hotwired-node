# Node Hotwired App

A modern Node.js web app applying Ruby on Rails' Hotwire principles — Turbo and Stimulus — to deliver server-driven interactivity without the frontend JS headache.

## Hotwire Philosophy
No frontend JS framework required. Let the server drive your app. Keep interactivity simple, fast, and maintainable.

## Why This Project?

This project brings Hotwire’s simplicity to the Node.js ecosystem. It demonstrates:
- Turbo’s fast, partial page updates
- Stimulus’ lightweight, modular interactivity
- Familiar patterns like EJS (Rails’ ERB) and Tailwind (Rails default stack)
- Minimal need for complex frontend JavaScript or SPA overhead

## Features

- **Turbo-Powered Navigation**: Partial page updates without full reloads.
- **Stimulus Controllers**: Declarative, modular JavaScript behavior.
- **Dynamic Room Listing**: Real-time UI updates via server responses.
- **EJS Templating**: Familiar to Rails’ ERB views.
- **Tailwind CSS**: Utility-first styling like modern Rails.
- **Turbo Stream Middleware**: Mimics ActionCable without WebSockets.
- **Clean Architecture**: Routes, views, controllers, and assets organized.

## Tech Stack

- **Backend**: Node.js, Express.js, ViteExpress
- **Frontend**: Turbo, Stimulus, Tailwind CSS
- **Templating**: EJS
- **Build Tool**: Vite
- **Middleware**: Custom Turbo Stream support

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm (v8+)

### Setup

```bash
git clone https://github.com/yourusername/hotwired-app.git
cd hotwired-app
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Future Enhancements
- WebSocket support (like Action Cable)
- User authentication
- More Stimulus controllers
- Production optimizations (cache, CDN)
