// import React, { useEffect } from 'react'
// import useConversation from '../Zustand/useConversation'
// import toast from 'react-hot-toast';
// const useGetMessage = () => {
//  const {messages,setMessages,selectedConversation} = useConversation();

//  useEffect(()=>{
//     const fetchMessages = async () => {
//         try {
//         const res = await fetch(`/api/messages/${selectedConversation._id}`) 
//         const data = await res.json()
//         if(data.error) throw new Error(data.error)
//         setMessages(data)
//         } catch (error) {
//             toast.error(error.messages)
//         }
//         if(selectedConversation?._id) fetchMessages()   
//     }
//  },[selectedConversation?._id,setMessages])
//  return messages
// }

// export default useGetMessage

import { useEffect } from "react";
import useConversation from "../Zustand/useConversation"
import toast from "react-hot-toast";

const useGetMessage = () => {
	const { messages, setMessages, selectedConversation } = useConversation();

	useEffect(() => {
		const getMessages = async () => {
			try {
				const res = await fetch(`/api/messages/${selectedConversation._id}`);
				const data = await res.json();
				if (data.error) throw new Error(data.error);
				setMessages(data);
			} catch (error) {
				toast.error(error.message);
			}
		};

		if (selectedConversation?._id) getMessages();
	}, [selectedConversation?._id, setMessages]);

	return { messages};
};
export default useGetMessage;
