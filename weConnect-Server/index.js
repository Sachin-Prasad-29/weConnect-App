// Node server which will handle socker io connections
const port = process.env.PORT || 8000;
const io = require("socket.io")(8000);

const users = {};

io.on("connection", (socket) => {
  // IF any new user joins , lets other users connected to the server know
  socket.on("new-user-joined", (name) => {
    // console.log("New user ", names);
    users[socket.id] = name;
    socket.broadcast.emit("user-joined", name);
  });

  //If someone sends a message , broadcast it to other people
  socket.on("send", (message) => {
    socket.broadcast.emit("receive", { message: message, names: users[socket.id] });
  });

  //If someone leaves the chat let other know about it
  socket.on("disconnect", (message) => {
    socket.broadcast.emit("left", users[socket.id]);
    delete users[socket.id];
  });
});
