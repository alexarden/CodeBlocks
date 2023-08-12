// const express = require("express");
import express from "express";
// const mongoose = require("mongoose");
import mongoose from "mongoose";
const app = express();
// const http = require("http");
import http from "http";
// const { Server } = require("socket.io");
import { Server } from "socket.io";
// const cors = require("cors");
import cors from "cors";
// const dotenv = require("dotenv");
import dotenv from "dotenv";
dotenv.config();
app.use(cors);
const server = http.createServer(app);
const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI;
// const { getCodeBlocks } = require("../controllers/codeBlock.js");
import { getCodeBlocks, setCodeBlock } from "../controllers/codeBlock.mjs";

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

  socket.on("codeBlocks", async () => {
    let response = await getCodeBlocks();
    console.log(response);
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
