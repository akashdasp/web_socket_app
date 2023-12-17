import Image from 'next/image'
import { Exo, Inter } from 'next/font/google'
import { useSocket } from '@/context/socket'
import { useEffect } from 'react'

const inter = Inter({ subsets: ['latin'] })
export default function Home(){
  const socket=useSocket()

  useEffect(()=>{
  socket?.on("connect",()=>{
    console.log("the connecton id is",socket.id);
  });
},[socket])
  return(
    <h1>Welcome</h1>
  )
}

