const express = require('express');
const cors = require('cors');
const { Server } = require('socket.io');
const http = require('http');

const app = express();

app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log(`user connected ${socket.id}`);

  socket.on('join_room', (data) => {
    socket.join(data);
    socket.join('room1');
    console.log(socket.rooms);
    console.log(`user with id ${socket.id} has joined room ${data}`);
  });
  socket.on('send_message', (data) => {
    console.log(data);
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});
server.listen(5001, () => console.log('running'));
