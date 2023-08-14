import { socket } from "../../services/service";
import { useEffect, useState } from "react";
import Mentor from "../Mentor/Mentor";
import Student from "../Student/Student";
import "./App.scss";

function App() {
  const [connections, setConnectios] = useState(0);
  const [role, setRole] = useState("");

  useEffect(() => {
    socket.emit("connections");
    socket.on("connections-response", (connectiosResponse) => {
      console.log("connections: ", connectiosResponse);
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

  const handleClick = () => {
    socket.emit("connections");
  };

  return (
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
