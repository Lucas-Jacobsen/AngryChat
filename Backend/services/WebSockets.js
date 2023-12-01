import { Server } from "socket.io";
import { server } from "../index.js";

export const io = new Server(server);

let userRoom = null;
io.on("connection", (socket) => {
    console.log("Connected a User");
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

