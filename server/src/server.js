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

io.on("connection", (socket) => {
  socket.on("edit", (newCode) => {
    // Update the shared code and broadcast the changes
    sharedCode = newCode;
    socket.emit("codeUpdate", sharedCode);
  });
});

server.listen(port, () => {
  console.log(`listening on *:${port}`);
});
