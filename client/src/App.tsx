import { Button } from 'react-bootstrap'
import { socket } from './service/service'
import { useEffect, useState } from 'react'
import Mentor from './Mentor'
import Student from './Student'
function App() {

    const [connections, setConnectios] = useState(0)

    useEffect(() => {
        socket.emit('connections')
        socket.on('connections-response', (connectiosResponse) => {
            console.log(connectiosResponse)
            setConnectios(connectiosResponse)
        })
    }, [])

    const handleClick = () => {
        socket.emit('connections')
    }

    return (
        <div>
            {connections === 1 ? <Mentor /> : <Student />}
        </div>
    );
}
export default App; 
