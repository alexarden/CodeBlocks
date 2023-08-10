import { useEffect, useState } from 'react';
import { socket } from './service/service'
import './App.scss';
import { Controlled as CodeMirror } from "react-codemirror2";

const CodeEditor = () => {
  const [code, setCode] = useState("");

  useEffect(() => {
    socket.on("codeUpdate", (newCode) => {
      setCode(newCode);
    });
  }, []);

  const handleCodeChange = (editor: any, data: any, newCode: any) => {
    // Send the newCode to the server for broadcasting
    socket.emit("edit", newCode);
  };

  return (
    <div>
      Hey
      <CodeMirror
        value={code}
        onBeforeChange={handleCodeChange}
        options={{
          mode: "javascript",
          theme: "material",
          lineNumbers: true,
        }}
      />
    </div>
  );
};

export default CodeEditor;
