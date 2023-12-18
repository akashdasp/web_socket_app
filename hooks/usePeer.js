const {useState, useEffect, useRef}=require('react')

const usePeer=()=>{
    const [peer,setPeer]=useState(null)
    const [myid,setMyId]=useState('')
    const isPeerset=useRef(false)

    
    useEffect(()=>{
        if (isPeerset.current) return;
        isPeerset.current=true;
        (async function initPeer(){
            const myPeer=new (await import('peerjs')).default()
            setPeer(myPeer)
            myPeer.on("open",(id)=>{
                console.log(`your peer id is ${id}`)
                setMyId(id)
            })

        })()
    },[])
}
export default usePeer;