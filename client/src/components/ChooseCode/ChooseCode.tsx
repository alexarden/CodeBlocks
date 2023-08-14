import React, { useEffect, useState } from "react";
import { socket } from "../../services/service";
import styled from "styled-components";
import { Button } from "react-bootstrap";
import "../App/App.scss";

const CodeBlock = styled.div`
  margin: 16px;
  text-align: center;
  button {
    width: 110px;
  }
`;

function CodeEditor(props: any) {
  const [thisCodeBlocks, setThisCodeBlocks] = useState([]);
  const codeBlocks = props.codeBlocks;
  const setCodeBlocks = props.setCodeBlocks;

  useEffect(() => {
    try {
      const savedCode = sessionStorage.getItem("code");
      if (savedCode) {
        props.setCode(JSON.parse(savedCode));
      } else {
        props.setCode("No code saved.");
      }
    } catch (e) {
      console.log(e);
    }
    socket.emit("code-blocks");
    socket.on("code-blocks-response", (codeBlocks) => {
      setThisCodeBlocks(codeBlocks);
    });
  }, []);

  const handleClick = (e: any) => {
    let codeBlock = thisCodeBlocks.find(
      (CodeBlock: any) => CodeBlock._id === e.target.dataset.id
    );
    sessionStorage.setItem("code-block", JSON.stringify(codeBlock));
    setCodeBlocks(codeBlock);
  };

  return thisCodeBlocks ? (
    <>
      <div
        className="title"
        style={{
          textAlign: "center",
        }}
      >
        Pick A Challenge
      </div>
      {thisCodeBlocks.map((block: any) => (
        <CodeBlock key={block._id} data-id={block._id}>
          <Button
            variant="primary"
            data-id={block._id}
            onClick={(e) => handleClick(e)}
          >
            <div data-id={block._id}>
              <div data-id={block._id}>{block.title}</div>
            </div>
          </Button>
        </CodeBlock>
      ))}
    </>
  ) : (
    <div>Loading...</div>
  );
}
export default CodeEditor;
