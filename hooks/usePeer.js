const { useState, useEffect, useRef } = require('react');

const usePeer = () => {
    const [peer, setPeer] = useState(null);
    const [myId, setMyId] = useState('');
    const isPeerset = useRef(false);

    useEffect(() => {
        if (isPeerset.current) return;
        isPeerset.current = true;

        (async function initPeer() {
            const myPeer = new (await import('peerjs')).default();
            setPeer(myPeer);

            myPeer.on("open", (id) => {
                console.log(`Your peer id is ${id}`);
                setMyId(id);
            });
        })();
    }, []);

    // Return the values or functions you want to expose to the component
    return { peer, myId };
};

export default usePeer;
