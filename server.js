const express = require('express');

const app = express();
const port = Number(process.env.PORT || 3000);
const server = app.listen(port);

app.use(express.static('public'));

console.log(`Server is listening on port ${port}`);

const socket = require("socket.io");
const io = socket(server);

io.sockets.on('connection', (socket) => {
  console.log("new connection: " + socket.id);
  
  // define handlers for events we expect to receive
  socket.on('playSound', (data) => {
    console.log("Data: ",  data);
    io.emit('playSound', data);
  })

  socket.on('clearTint', (data) => {
    console.log("other side: ", data);
    io.emit("clearTint",  data);
  })

});