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

io.on("connection", (socket) => {
  socket.on("message", (data) => {
    console.log(data);
  });
});

server.listen(port, () => {
  console.log(`listening on *:${port}`);
});
