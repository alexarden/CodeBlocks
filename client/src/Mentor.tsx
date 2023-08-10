import { useEffect, useState } from "react"
import { socket } from './service/service'

function Mentor() {
    const [code, setCode] = useState('Hello there :)');

    useEffect(() => {
        socket.on("codeUpdate", (newCode: any) => {
            console.log('Code from server arrived');
            setCode(newCode);
        });
    }, []);

    return (
        <div>{code}</div>
    )
}

export default Mentor
