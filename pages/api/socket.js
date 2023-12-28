import { Server } from "socket.io";

const SocketHandeler=(req,res)=>{
    if(res.socket.server.io){
        console.log("the server is runing Already")
    } 
    else
    {

        const io=new Server(res.socket.server)
        res.socket.server.io=io
        io.on("connection",(socket)=>{
            console.log("server is connected")
            socket.on('join-room',(roomid,userid)=>{
                console.log(`a new user with ${userid} joind the roomid ${roomid}`)
                socket.join(roomid)
                socket.broadcast.to(roomid).emit("user-connected",userid)
            })
        })
    }
    res.end(); 
}
export default SocketHandeler;