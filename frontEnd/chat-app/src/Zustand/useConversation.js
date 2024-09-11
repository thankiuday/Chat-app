import {create} from 'zustand'

const useConversationn = create((set)=>({
    selectedConversation : null,
    setSelectedConversation :(selectedConversation) =>set({selectedConversation}),
    messages : [],
    setMessages : (messages) => set({messages}) 
}))
 export default useConversationn;
    