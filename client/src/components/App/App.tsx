import { socket } from "../../services/service";
import { useEffect, useState } from "react";
import Mentor from "../Mentor";
import Student from "../Student";

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

  // useEffect(() => {
  //   window.sessionStorage.setItem("role", role);
  // }, [role]);

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
