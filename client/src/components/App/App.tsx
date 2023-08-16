import { socket } from "../../services/service";
import { useEffect, useState } from "react";
import Mentor from "../Mentor/Mentor";
import Student from "../Student/Student";
import "./App.scss";
import Spinner from "react-bootstrap/Spinner";

function App() {
  const [connections, setConnectios] = useState(0);
  const [role, setRole] = useState("");

  useEffect(() => {
    // Set user as mentor or user based on connectios.
    socket.emit("connections");
    socket.on("connections-response", (connectiosResponse) => {
      setConnectios(connectiosResponse);
      window.sessionStorage.setItem("connections", connectiosResponse);
      if (window.sessionStorage.getItem("role") === null) {
        if (connectiosResponse === 1) {
          window.sessionStorage.setItem("role", "Mentor");
          setRole("Mentor");
        } else {
          window.sessionStorage.setItem("role", "Student");
          setRole("Student");
        }
      }
    });
  }, []);

  return connections === 0 ? (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Spinner
        animation="border"
        style={{
          margin: "16px",
        }}
      />
      <div>Loading...</div>
    </div>
  ) : (
    <div>
      {window.sessionStorage.getItem("role") === "Mentor" ? (
        <Mentor />
      ) : (
        <Student />
      )}
    </div>
  );
}
export default App;
