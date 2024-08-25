import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import http from 'http';

import registerRoutes from './routes/routes.js'; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware to process JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CORS configuration middleware
app.use(corsMiddleware);

// Register routes
registerRoutes(app);

// 404 error handler
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not found' });
});

// General error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Server configuration
const port = normalizePort(process.env.NODE_ENV === 'test' ? '3001' : process.env.PORT || '3000');
app.set('port', port);

const server = http.createServer(app);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val) {
  const port = parseInt(val, 10);
  return isNaN(port) ? val : port >= 0 ? port : false;
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      if (process.env.NODE_ENV !== 'test') {
        process.exit(1);
      }
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      if (process.env.NODE_ENV !== 'test') {
        process.exit(1);
      }
      break;
    default:
      throw error;
  }
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  console.log(`Listening on ${bind}`);
}

// CORS handling middleware
function corsMiddleware(req, res, next) {
  const allowedDomains = process.env.ALLOWED_DOMAINS ? process.env.ALLOWED_DOMAINS.split(',') : [];
  const origin = req.headers.origin;
  if (allowedDomains.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, OPTIONS, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
}

export default app;
