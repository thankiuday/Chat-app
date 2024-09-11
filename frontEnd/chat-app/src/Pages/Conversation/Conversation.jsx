import React, { useEffect, useRef, useState } from 'react'
import useConversationn from '../../Zustand/useConversation'
import useSendMessage from '../../Hoocks/useSendMessage'
import useGetMessage from '../../Hoocks/useGetMessage.js'
import { useAuthContext } from '../../Context/AuthContext'
import extractTime from '../../utils/extractTime.js'
import useListenMessages from '../../Hoocks/useListenMessages.js'
export const Conversation = () => {
    const { selectedConversation, setSelectedConversation } = useConversationn();
    

    // logic of sending message
    const [message, setMessage] = useState("")
    const { sendMessage } = useSendMessage();
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!message) return

        await sendMessage(message)
        setMessage("")
    }

    // logic of getting messages from db
    const { messages } = useGetMessage()
    // calling the useListenMessages hook
    useListenMessages()
    // cheak if the message is from us or from ather user
    const { authUser } = useAuthContext()
    //  let fromMe = message.senderId === authUser._id;

    
    useEffect(() => {
              setSelectedConversation(null)

    }, [setSelectedConversation])

    // logic for automatically scroll to the last message
    const chatContainerRef = useRef(null);
     // Scroll to the bottom after rendering the component
    const scrollToBottom = () => {
    setTimeout(() => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      }
    }, 0); // Ensures this runs after rendering
  };
  scrollToBottom();

    return (
        <>
            {/* conversation code */}
            <div className="col-md-8 bg-transparent conversation" >
                {!selectedConversation ? <NoChatSelected /> : (
                    <>                    {/* header */}
                        <div className="row">
                            <div className="py-2 px-4  header d-none d-lg-block">
                                <div className="d-flex align-items-center py-1">
                                    <div className="position-relative">
                                        <img src={selectedConversation.profilePic} className="rounded-circle mr-1" alt="Sharon Lessman" width="60" height="60" />
                                    </div>
                                    <div className="flex-grow-1 pl-3 text-light">
                                        <strong className='ms-3' >{selectedConversation.fullName}</strong>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* header end */}
                        <ul className="list-group  mt-5 mb-5 chat-container" style={{ height: '50vh', overflowY: 'auto' } } ref={chatContainerRef}>
                            {messages.map((message, index) => {
                                const fromMe = message.senderId === authUser._id;
                                const chatClassName = fromMe ? 'justify-content-end' : 'justify-content-start';
                                const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
                                const bubbleBgColor = fromMe ? 'bg-primary' : 'bg-secondary';
                                const fromattedDate  = extractTime(message.createdAt)

                                return (
                                    <li className="list-group-item bg-transparent" style={{ border: "none" }} key={index}>
                                        <div className="row ">
                                            <div className={`d-flex flex-row ${chatClassName}`}>
                                                <img src={profilePic} alt="avatar 1" style={{ width: "60px", height: "60px" }} />
                                                <div >
                                                    <p className={`small p-2 ms-3 mb-1 rounded-3 ${bubbleBgColor} fw-bold`}>
                                                        {message.message}
                                                    </p>
                                                    <p className="small ms-3 mb-3 rounded-3 text-light float-end">{fromattedDate}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                        {/* send container */}
                        <form onSubmit={handleSubmit}>
                            <div className="row mb-2 sendContainer ">
                                <div className="col-10">
                                    <input type="text" className='form-control' placeholder='Message...'
                                        value={message} onChange={(e) => { setMessage(e.target.value) }} />
                                </div>
                                <div className="col-2">
                                    <button className='btn btn-primary w-100 h-100'><i className='fas fa-paper-plane'></i></button>
                                </div>
                            </div>
                        </form>
                        {/* send container end*/}
                    </>
                )}
            </div>
            {/* conversation code end */}

        </>
    )
}

// no chat selected
const NoChatSelected = () => {
    const ActiveUserName = useAuthContext();
    return (
        <>

            <div className="row " style={{ height: '70vh', overflowY: 'auto' }}>
                <div className="col-md-12  my-auto text-center text-light fw-bold fs-4">
                    <p>Hello {ActiveUserName.fullName}!</p>
                    <p>Click on a chat to start a conversation</p>
                    <i className='fas fa-comment-slash fs-1'></i>
                </div>
            </div>

        </>
    )
}   
