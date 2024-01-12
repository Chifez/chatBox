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

  socket.on('create_room', (data) => {
    socket.join(data.Room);
    const message = `you have created ${data.name}`;
    console.log(message);
    socket.to(data.room).emit('create_room', message);
  });

  socket.on('join_room', (data) => {
    socket.join(data.room);
    const message = `${data.user} has joined `;
    console.log(message);
    socket.to(data.room).emit('join_room', message);
  });
  socket.on('leave_room', (data) => {
    socket.leave(data.room);
    const message = `${data.user} has left `;
    console.log(message);
    socket.to(data.room).emit('join_room', message);
  });

  socket.on('send_message', (data) => {
    socket.to(data.room).emit('receive_message', data);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});
server.listen(5001, () => console.log('running'));
