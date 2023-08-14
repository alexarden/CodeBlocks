import { useEffect, useState } from "react";
import { socket } from "../../services/service";
import CodeMirror from "@uiw/react-codemirror";
import { EditorView } from "codemirror";
import { EditorState } from "@codemirror/state";
import { javascript } from "@codemirror/lang-javascript";
import styled from "styled-components";

const Container = styled.div`
  width: 800px;
  .title {
    text-align: center;
    margin: 40px;
  }
`;

function Mentor() {
  const [code, setCode] = useState("Hello there :)");
  const [role, setRole] = useState("Mentor");

  useEffect(() => {
    try {
      const savedCode = sessionStorage.getItem("code");
      if (savedCode) {
        setCode(JSON.parse(savedCode));
      } else {
        setCode("Waiting for student to start typing...");
      }
    } catch (e) {
      console.log(e);
    }

    socket.on("codeUpdate", (newCode: any) => {
      console.log("Code from server arrived");
      setCode(newCode);
      sessionStorage.setItem("code", JSON.stringify(newCode));
    });
  }, []);

  return role === "Mentor" ? (
    <Container>
      <div className="title">Mentor</div>
      <CodeMirror
        value={code}
        height="200px"
        extensions={[
          javascript({ jsx: true }),
          EditorView.editable.of(false),
          EditorState.readOnly.of(true),
        ]}
      />
    </Container>
  ) : (
    <div>No Mentor role...</div>
  );
}

export default Mentor;

// @ts-ignore
// import CodeMirrorMerge from 'react-codemirror-merge';/
// import { EditorView } from 'codemirror';
// import { EditorState } from '@codemirror/state';

// const Original = CodeMirrorMerge.Original;
// const Modified = CodeMirrorMerge.Modified;
// let doc = `one
// two
// three
// four
// five`;

// export const Example = () => {
//   return (
//     <CodeMirrorMerge>
//       <Original value={doc} />
//       <Modified
//         value={doc.replace(/t/g, 'T') + 'Six'}
//         extensions={[EditorView.editable.of(false), EditorState.readOnly.of(true)]}
//       />
//     </CodeMirrorMerge>
//   );
// };
