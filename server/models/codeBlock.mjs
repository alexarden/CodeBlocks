// const mongoose = require("mongoose");
import mongoose from "mongoose";

const Schema = mongoose.Schema;

/* Creating a new schema for the activity model. */
const codeBlockSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    require: true,
  },
});

export default mongoose.model("CodeBlock", codeBlockSchema);
