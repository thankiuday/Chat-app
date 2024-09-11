import useLogOut from '../../Hoocks/useLogOut'
import useGetConversations from '../../Hoocks/useGetConversations';
import useConversation from '../../Zustand/useConversation';
import '../Sidebar/Sidebar.css'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useSocketContext } from '../../Context/SocketContext';
import { getRandomEmoji } from '../../utils/emojis';
const SideBar = () => {
    // logout logic
    const { logOutLogic } = useLogOut()

    // getting the userslist from db
    const { loading, conversation } = useGetConversations();

    // adding the functionality of selected users to chat with
    const { selectedConversation, setSelectedConversation } = useConversation()
    // let isSelected = false;
    // isSelected = selectedConversation?._id === conversation._id;
    const [isSelected, setIsSelected] = useState(false)
    useEffect(() => {
        selectedConversation?.id === conversation._id ? setIsSelected(true) : setIsSelected(false)
       
    }, [])
    let { onlineUsers } = useSocketContext();
    console.log(onlineUsers)
	const isOnline = onlineUsers.includes(conversation._id);
     console.log(isOnline);
    // search logic
    const [search, setSearch] = useState('')
    // function to handle submit
    const handleSubmit = (e)=>{
        e.preventDefault()
        if(!search) return
        if(search.length <3)
        {
            return toast.error("Search Input Must Be Atleast 3 Character Long")
        }
        
        const find = conversation.find((c)=> c.fullName.toLowerCase().includes(search.toLowerCase()))
        if(!find)
        {
            toast.error("No Conversation Found!")
        }
        if(find) {
            setSelectedConversation(find)
            setSearch('')
        } 


    }


    return (
        <>
            {/* side bar code */}
            <div className="col-md-4 sideBar " > <h2 className="fw-bold mb-3 text-light text-center">Long<span className='text-primary'>Talks!</span></h2>
                {/* search input and search button code */}
                <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-10">
                        <input type="text" className='form-control fw-bold ' placeholder='Search...'
                        value={search} onChange={(e)=>setSearch(e.target.value)} />
                    </div>
                    <div className='col-md-2'>
                        <button className='btn btn-primary w-100 '><i className='fas fa-search fs-5'></i> </button>
                    </div>
                </div>
                </form>
                {/* search input and search button code end */}
                {/* users list code start here */}
                <div className="col-md-12 userList mt-5  " >
                    <ul className={`list-group m t-5 mb-5`} style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                        {conversation.map((conversation) => (
                            <li
                                className={`list-group-item bg-transparent ${isSelected ? "hoverUser" : ""} `} key={conversation._id}
                                onClick={() => { setSelectedConversation(conversation); }}>
                                <div className={`row `} >
                                    <div className="col-md-4 users-avatar"><img src={conversation.profilePic} className='bg-light rounded-5' alt="user avatar" height={50} width={50} /></div>
                                    <div className="col-md-6 users-name text-light fs-3">{conversation.fullName}</div>
                                    <div className="col-md-2 users-status text-success text-end fs-5">{getRandomEmoji()}</div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                {/* users list code start here */}

                {/* logOut Button code */}
                <div className="col-md-12">
                    {!loading ? (
                        <div className="row">
                            <div className="text-end">
                                <button className='btn btn-outline-danger logOutButton'><i className='fas fa-sign-out-alt fs-4' onClick={logOutLogic} /></button>
                            </div>
                        </div>
                    ) : (
                        <div className="row">
                            <div className="text-end">
                                <button className='btn btn-outline-danger logOutButton'><i className='fas fa-sign-out
                                -alt fs-4'></i></button>
                            </div>
                        </div>
                    )}
                </div>
                {/* logOut Button code end */}
            </div>
            {/* side bar code end */}
        </>
    )
}

export default SideBar