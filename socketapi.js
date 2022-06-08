const io = require("socket.io")();
const socketapi = {
  io: io,
};

const users = new Set();

// Add your socket.io logic here!
io.on("connection", function (socket) {
  console.log("User connected");
  io.emit("username");
  socket.on("add", function (data) {
    users.add(data);
    console.log(Array.from(users));
    io.emit("users", JSON.stringify({ users: Array.from(users) }));
  });
  socket.on("delete", function (data) {
    users.delete(data);
    console.log(Array.from(users));
    io.emit("users", JSON.stringify({ users: Array.from(users) }));
  });
  socket.on("chat", function (data) {
    console.log(data);
    io.emit("chat", data);
  });
});
// end of socket.io logic

module.exports = socketapi;
