// const express = require('express');
// const cors = require('cors');
// const { Server } = require('socket.io');
// const http = require('http');

// const app = express();

// app.use(cors());
// const server = http.createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: 'http://localhost:5173',
//     methods: ['GET', 'POST'],
//   },
// });

// const rooms = {};

// io.on('connection', (socket) => {
//   console.log(`user connected ${socket.id}`);

//   socket.on('create_room', (data) => {
//     socket.join(data.Room);
//     const message = `you have created ${data.name}`;
//     console.log(message);
//     // socket.to(data.room).emit('create_room', message);

//     socket.on('get_room_details', (data) => {
//         const { roomId } = data;
//         if (rooms[roomId]) {
//           // Emit roomDetails event to provide information about the room
//           socket.emit('roomDetails', { roomName: rooms[roomId].roomName });
//         }
//       });

//   });

//   socket.on('join_room', (data) => {
//     socket.join(data.room);
//     const message = `${data.user} has joined `;
//     console.log(message);
//     socket.to(data.room).emit('join_room', message);
//   });
//   socket.on('leave_room', (data) => {
//     socket.leave(data.room);
//     const message = `${data.user} has left `;
//     console.log(message);
//     socket.to(data.room).emit('join_room', message);
//   });

//   socket.on('send_message', (data) => {
//     socket.to(data.room).emit('receive_message', data);
//   });

//   socket.on('disconnect', () => {
//     console.log('user disconnected');
//   });
// });
// server.listen(5001, () => console.log('running'));

const express = require('express');
const cors = require('cors');
const { Server } = require('socket.io');
const http = require('http');
const fs = require('fs');
const app = express();

app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

const rooms = {};

io.on('connection', (socket) => {
  console.log(`user connected ${socket.id}`);

  socket.on('join_room', (data) => {
    socket.join(data.room);
    const message = `${data.user} has joined `;
    console.log(message);
    socket
      .to(data.room)
      .emit('notification', { type: 'alert', value: message });

    // Emit roomDetails event in response to get_room_details request
    if (rooms[data.room]) {
      socket.emit('roomDetails', { roomName: rooms[data.room].roomName });
    }
  });

  socket.on('create_room', (data) => {
    socket.join(data.room);
    const message = `you have created ${data.name}`;
    console.log(message);
    socket
      .to(data.room)
      .emit('notification', { type: 'alert', value: message });

    // Store room details
    rooms[data.room] = { roomName: data.name };

    // Emit an event to notify all clients about the new room
    io.emit('roomCreated', { roomId: data.room, roomName: data.name });
  });

  socket.on('typing', (data) => {
    console.log(data);
    socket.to(data.room).emit('typing', data);
  });

  socket.on('send_message', (data) => {
    console.log(data);
    socket.to(data.room).emit('receive_message', { type: 'text', value: data });
  });

  socket.on('leave_room', (data) => {
    socket.leave(data.room);
    const message = `${data.user} has left `;
    console.log(message);
    socket
      .to(data.room)
      .emit('notification', { type: 'alert', value: message });
  });

  socket.on('updateName', (data) => {
    const message = `${data.oldName} has updated their username to ${data.newUpdate.Username}`;
    socket
      .to(data.Room)
      .emit('notification', { type: 'alert', value: message });
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  // Listen for get_room_details event to respond with room details
  socket.on('get_room_details', (data) => {
    const { roomId } = data;
    if (rooms[roomId]) {
      socket.emit('roomDetails', { roomName: rooms[roomId].roomName });
    }
  });
});

server.listen(5001, () => console.log('running'));
