import React, { useEffect, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { socket } from './service/service'

function App() {
  const [code, setCode] = useState('Hello there :)');

  useEffect(() => {
    socket.on("codeUpdate", (newCode) => {
      console.log('Code from server arrived');
      setCode(newCode);
    });
  }, []);

  const onChange = React.useCallback((value: any) => {
    socket.emit('edit', value)
  }, []);

  return (
    <div>
      <CodeMirror
        value={code}
        height="200px"
        extensions={[javascript({ jsx: true })]}
        onChange={onChange}
      />
    </div>
  );
}
export default App;
