"use client";
import { useAuth, useUser } from "@clerk/nextjs";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const AppContext = createContext();

export const useAppContext = ()=>{
    return useContext(AppContext)
}

export const AppContextProvider = ({children})=>{
    const {user} = useUser()
    const {getToken} = useAuth()

    const [chats, setChats] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [isChatsLoading, setIsChatsLoading] = useState(false);

    const createNewChat = async ()=>{
        try {
            if(!user) return null;

            const token = await getToken();

            await axios.post('/api/chat/create', {}, {headers:{
                Authorization: `Bearer ${token}`
            }})
            return await fetchUsersChats();
        } catch (error) {
            toast.error(error.message)
        }
    }

    const fetchUsersChats = async ()=>{
        try {
            setIsChatsLoading(true);
            const token = await getToken();
            const {data} = await axios.get('/api/chat/get', {headers:{
                Authorization: `Bearer ${token}`
            }})
            if(data.success){
                console.log(data.data);
                setChats(data.data)

                 // If the user has no chats, create one
                 if(data.data.length === 0){
                    return await createNewChat();
                 }else{
                    // sort chats by updated date
                    data.data.sort((a, b)=> new Date(b.updatedAt) - new Date(a.updatedAt));

                     // set recently updated chat as selected chat
                     setSelectedChat(data.data[0]);
                     console.log(data.data[0]);
                     return data.data[0];
                 }
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        } finally {
            setIsChatsLoading(false);
        }
    }

 useEffect(()=>{
    if(user){
        fetchUsersChats();
    }
 }, [user])

    const ensureActiveChat = async ()=>{
        if(!user) return null;
        if(selectedChat) return selectedChat;
        const chat = await fetchUsersChats();
        return chat || null;
    }

    const value = {
        user,
        chats,
        setChats,
        selectedChat,
        setSelectedChat,
        isChatsLoading,
        ensureActiveChat,
        fetchUsersChats,
        createNewChat
    }
    
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}