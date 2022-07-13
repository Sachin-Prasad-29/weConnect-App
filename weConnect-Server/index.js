// Node server which will handle socker io connections

const io = require("socket.io")(8000);

const users = {};

io.on("connection", (socket) => {
  socket.on("new-user-joined", (names) => {
    console.log("New user ", names);
    users[socket.id] = names;
    socket.broadcast.emit("user-joined", names);
  });

  socket.on("send", (message) => {
    socket.broadcast.emit("recieve", { message: message, names: users[socket.id] });
  });
});
