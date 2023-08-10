import React, { useEffect, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { socket } from "../services/service";

function CodeEditor() {
  const [code, setCode] = useState("Hello there :)");
  const [role, setRole] = useState("Student");

  useEffect(() => {
    socket.on("codeUpdate", (newCode) => {
      console.log("Code from server arrived");
      setCode(newCode);
    });
  }, []);

  const onChange = React.useCallback((value: any) => {
    socket.emit("edit", value);
  }, []);

  return role === "Student" ? (
    <div>
      <div>Student</div>
      <CodeMirror
        value={code}
        height="200px"
        extensions={[javascript({ jsx: true })]}
        onChange={onChange}
      />
    </div>
  ) : (
    <div>No Student role...</div>
  );
}
export default CodeEditor;
