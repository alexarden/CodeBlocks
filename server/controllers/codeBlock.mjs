// const CodeBlock = require("../models/codeBlock.js");
import CodeBlock from "../models/codeBlock.mjs";

const getCodeBlocks = async () => {
  try {
    const codes = await CodeBlock.find();
    if (codes) {
      return codes;
    } else {
      return null;
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const setCodeBlock = async () => {
  const newCode = new CodeBlock({
    title: "Test",
    code: "Code",
    description: "desc",
  });
  const saved = await newCode.save();
  return saved;
};

export { getCodeBlocks, setCodeBlock };
