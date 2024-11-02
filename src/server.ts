import dotenv from 'dotenv';
import app from './app';
import { createServer } from 'http';
import { WebSocketServer, WebSocket } from 'ws';

dotenv.config();

const PORT = process.env.PORT || 5000;

// Create HTTP server
const server = createServer(app);

// Create WebSocket server
export const wss = new WebSocketServer({ server });

wss.on('connection', (ws: WebSocket) => {
  console.log('Client connected');

  ws.send(JSON.stringify({ message: 'Welcome to the WebSocket server!' }));

  ws.on('message', (message: string) => {
    console.log(`Received message: ${message}`);
  });


  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});