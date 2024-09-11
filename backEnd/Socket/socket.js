import { Server } from "socket.io";
import http from 'http'
import  express from 'express'
import { Socket } from "dgram";
const app = express();
const server = http.createServer(app);

const io = new Server(server,{
    cors: {
        origin: ['http://localhost:5173'],
        methods: ["GET", "POST"],
        credentials: true
    }
})
export const getReceiverSocketId = (receiverId)=>{
    return userSocketMap[receiverId]
}
const userSocketMap = {}; //{userId:socketId}

io.on('connection',(Socket)=>{
    console.log('a new client connected',Socket.id)

    const userId = Socket.handshake.query.userId;
    if(userId != "undefined")
    {
        userSocketMap[userId] = Socket.id;
    }
    // io.emit() is used to send event to all the connected clients
    io.emit("getOnlineUser",Object.keys(userSocketMap))


    Socket.on('disconnect',()=>{
        console.log('a client disconnected',Socket.id)
        delete userSocketMap[userId]
        io.emit("getOnlineUser",Object.keys(userSocketMap))
        })
})

export {app,server,io}
