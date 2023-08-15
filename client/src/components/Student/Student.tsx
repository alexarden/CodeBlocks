import React, { useEffect, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { socket } from "../../services/service";
import ChooseCode from "../ChooseCode/ChooseCode";
import { styled } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceLaughBeam } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";

const Container = styled.div`
  width: 800px;
  .title {
    text-align: center;
    margin: 40px;
    div {
      margin: 8px;
    }
  }
`;

function CodeEditor() {
  const [code, setCode] = useState("Hello");
  const [codeBlocks, setCodeBlocks] = useState<any>(null);

  useEffect(() => {
    try {
      const savedCode = sessionStorage.getItem("code");
      if (savedCode) {
        setCode(JSON.parse(savedCode));
      } else {
        setCode("Enter you answer here...");
      }
    } catch (e) {
      console.log(e);
    }

    if (sessionStorage.getItem("code-block")) {
      let codeBlock = JSON.parse(sessionStorage.getItem("code-block")!);
      setCodeBlocks(codeBlock);
    }

    socket.on("codeUpdate", (newCode) => {
      setCode(newCode);
      sessionStorage.setItem("code", JSON.stringify(newCode));
    });
  }, []);

  const onChange = React.useCallback((value: any) => {
    socket.emit("edit", value);
  }, []);

  const propSetCodeBlocks = (codeBlocks: any) => {
    setCodeBlocks(codeBlocks);
  };

  const handleClick = () => {
    setCode(codeBlocks.code);
    socket.emit("edit", codeBlocks.code);
  };

  return codeBlocks === null ? (
    <ChooseCode
      codeBlocks={codeBlocks}
      setCodeBlocks={propSetCodeBlocks}
      setCode={setCode}
    />
  ) : (
    <Container>
      <div className="title">
        <div>{codeBlocks.title}</div>
        <div>{codeBlocks.description}</div>

        {/* If code is correct show smiley face :) */}
        {code === codeBlocks.code ? (
          <>
            <FontAwesomeIcon
              icon={faFaceLaughBeam}
              style={{
                color: "#ffc107",
                width: "100px",
                height: "100px",
                margin: "16px",
              }}
            />
            <div>Great Job!!!</div>
          </>
        ) : (
          <></>
        )}

        <Button variant="success" onClick={handleClick}>
          Solution
        </Button>
      </div>

      <CodeMirror
        value={code}
        height="200px"
        extensions={[javascript({ jsx: true })]}
        onChange={onChange}
      />
    </Container>
  );
}
export default CodeEditor;
