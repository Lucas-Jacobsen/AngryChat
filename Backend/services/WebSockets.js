import {Server} from "socket.io";

export const io = new Server();
console.log(io);
let userRoom = null;
io.on("connection", (socket) => {
    socket.on("join", (room) => {
        userRoom = room;
        socket.join(userRoom);
    })

    socket.on("message", (message) => {
        if(userRoom != null) {
            io.to(userRoom).emit("message", message);
        }
    })
});

io.listen(3002);

