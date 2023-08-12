const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
app.use(cors);
const server = http.createServer(app);
const port = process.env.PORT || 3001;

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

let sharedCode = "";
let connections = 0;

io.on("connection", (socket) => {
  socket.on("edit", (newCode) => {
    // Update the shared code and broadcast the changes
    sharedCode = newCode;
    socket.emit("codeUpdate", sharedCode);
    socket.broadcast.emit("codeUpdate", sharedCode);
  });

  socket.on("connections", () => {
    socket.emit("connections-response", connections);
  });

  socket.on("disconnect", () => {
    connections -= 1;
  });

  connections += 1;
  console.log("connections: ", connections);
});

server.listen(port, () => {
  console.log(`listening on *:${port}`);
});
