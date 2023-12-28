import { useEffect } from 'react'
import { useSocket } from '@/context/socket'
import usePeer from '@/hooks/usePeer'
import useMediaStream from '@/hooks/useMediaStream'
import Player from '@/componet/Player'

const Room = () => {
    const socket = useSocket();
    const { peer, myId } = usePeer();
    const {stream}=useMediaStream()
    useEffect(()=>{
    if (!socket) return;
        const HandleUserConnected=(newUser)=>{
            console.log(`user connected in room with userid ${newUser}`)
        }
        socket.on('user-connected',HandleUserConnected);
        return()=>{
            socket.off('user-connected',HandleUserConnected)
        }
    },[socket])
    return (<div>
        <Player url={stream} muted playing  playerId={myId}/>
    </div>)
};

export default Room