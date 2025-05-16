'use client';
import { assets } from "@/assets/assets";
import Message from "@/components/Message";
import PromptBox from "@/components/PromptBox";
import Sidebar from "@/components/Sidebar";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Home() {

  const [expand, setExpand] = useState(false)
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const {selectedChat} = useAppContext()
  const containerRef = useRef(null)

  useEffect(()=>{
    if(selectedChat){
      setMessages(selectedChat.messages)
    }
  },[selectedChat])

  useEffect(()=>{
    if(containerRef.current){
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      })
    }
  },[messages])



  return (
    
 /* import { headers } from 'next/headers';
import React from 'react';
  //import Image from "next/image";
  export default function RestrictedPage() {
    const styles = {
      container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: '100vh',
        backgroundColor: 'black',
        textAlign: 'center',
        //fontFamily: 'Arial, sans-serif',
        position: 'relative',
      },
      heading: {
        
        fontSize: '3rem',
        color: 'red',
        fontWeight: '100',
        //marginBottom: '15px',
      },
      paragraph: {
        marginBottom: '50%',
        fontSize: '30px',
        color: 'red',
        fontWeight: '100',
        marginBottom: '30px',
      },
      maintenance: {
        fontSize: '1.7rem',
        color: '#03535B',
        fontWeight: '900',
      },
      bottomText: {
        position: 'fixed',
        bottom: '30px',
        width: '100%',
        textAlign: 'center',
        fontSize: '1.2rem',
        color: 'red',
        fontWeight: '700',
      },
      
    };
  
    return (
      <>
        <div style={styles.container}>
          <h1 style={styles.heading}>The Website is Restricted
                           <p>By Developer Due to Some reason.</p></h1>
                 
        
         <br /><br /><br /> <p style={styles.maintenance}>A Developer is working on another project.</p>
        </div>
        <p style={styles.bottomText}><a  href="https://www.instagram.com/prf_priyanshu/">@prf_priyanshu</a></p>
      </>
    );
  }*/
  
 
    <div>
      <div className="flex h-screen">
        <Sidebar expand={expand} setExpand={setExpand}/>
        <div className="flex-1 flex flex-col items-center justify-center px-4 pb-8 bg-[#292a2d] text-white relative">
          <div className="md:hidden absolute px-4 top-6 flex items-center justify-between w-full">
            <Image onClick={()=> (expand ? setExpand(false) : setExpand(true))}
             className="rotate-180" src={assets.menu_icon} alt=""/>
            <Image className="opacity-70" src={assets.chat_icon} alt=""/>
          </div>

          {messages.length === 0 ? (
            <>
            <div className="flex items-center gap-3">
              <Image src={assets.logo_icon} alt="" className="h-16"/>
              <p className="text-2xl font-medium">Hi, I'm DeepSeek.</p>
            </div>
            <p className="text-sm mt-2">How can I help you today?</p>
            </>
          ):
          (
          <div ref={containerRef}
          className="relative flex flex-col items-center justify-start w-full mt-20 max-h-screen overflow-y-auto"
          > 
          <p className="fixed top-8 border border-transparent hover:border-gray-500/50 py-1 px-2 rounded-lg font-semibold mb-6">{selectedChat.name}</p>
          {messages.map((msg, index)=>(
            <Message key={index} role={msg.role} content={msg.content}/>
          ))}
          {
            isLoading && (
              <div className="flex gap-4 max-w-3xl w-full py-3">
                <Image className="h-9 w-9 p-1 border border-white/15 rounded-full"
                 src={assets.logo_icon} alt="Logo"/>
                 <div className="loader flex justify-center items-center gap-1">
                  <div className="w-1 h-1 rounded-full bg-white animate-bounce"></div>
                  <div className="w-1 h-1 rounded-full bg-white animate-bounce"></div>
                  <div className="w-1 h-1 rounded-full bg-white animate-bounce"></div>
                 </div>
              </div>
            )
          }
            
          </div>
        )
        }
        <PromptBox isLoading={isLoading} setIsLoading={setIsLoading}/>
        <p className="text-xs absolute bottom-1 text-gray-500">AI-generated, for reference only</p>

        </div>
      </div>
    </div>
  );
}
