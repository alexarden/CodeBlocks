import io from "socket.io-client";

const url = process.env.REACT_APP_SOCKET_URL;

//@ts-ignore
const socket = io(url);

export { socket };
