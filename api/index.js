import { Server } from 'socket.io';
import express from 'express';
import http from 'http';

const app = express()
const server = http.createServer(app);
const io = new Server(server, {
  transports: ['websocket'],
});

io.on('connection', socket => {
  socket.onAny((event, ...args) => console.log(`Got event ${event} with args:`, args));
})

app.get("/", (_, res) => res.send("Hello world"))

server.listen(3000, () => {
  console.log("server has started");
})
