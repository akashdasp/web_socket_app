import { useSocket } from '@/context/socket';
import { useRouter } from 'next/router';

const { useState, useEffect, useRef } = require('react');

const usePeer = () => {
    const socket=useSocket()
    const roomid=useRouter().query.roomid;
    const [peer, setPeer] = useState(null);
    const [myId, setMyId] = useState('');
    const isPeerset = useRef(false);

    useEffect(() => {
        if (isPeerset.current || !roomid || !socket) return;
        isPeerset.current = true;
        let myPeer;
        (async function initPeer() {
            const myPeer = new (await import('peerjs')).default();
            setPeer(myPeer);

            myPeer.on("open", (id) => {
                console.log(`Your peer id is ${id}`);
                setMyId(id);
                socket?.emit("join-room",roomid,id)
                
            });
        })();
    }, [roomid,socket]);

    // Return the values or functions you want to expose to the component
    return { peer, myId };
};

export default usePeer;
