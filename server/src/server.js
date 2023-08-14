import express from "express";
import mongoose from "mongoose";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import { getCodeBlocks, setCodeBlock } from "../controllers/codeBlock.mjs";

const app = express();
dotenv.config();
app.use(cors);
const server = http.createServer(app);
const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI;
// const { getCodeBlocks } = require("../controllers/codeBlock.js");

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

  socket.on("code-blocks", async () => {
    try {
      let response = await getCodeBlocks();
      if (response) {
        console.log(response);
        socket.emit("code-blocks-response", response);
      }
    } catch (e) {
      console.log(e);
    }
  });

  connections += 1;
  console.log("connections: ", connections);
});

// server.listen(PORT, () => {
//   console.log(`listening on *:${PORT}`);
// });

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    server.listen(PORT, () => console.log(`Server stated on port ${PORT}`));
  })
  .catch((err) => {
    console.log(err);
  });
