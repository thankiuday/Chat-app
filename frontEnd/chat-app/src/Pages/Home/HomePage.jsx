import React from 'react'
import '../Home/HomePage.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import SideBar from '../Sidebar/SideBar';
import { Conversation } from '../Conversation/Conversation';
const HomePage = () => {
  return (
    <div className='container  h-100'>
      <div className="row">
       <SideBar/>
        <Conversation />
      </div>

    </div>
  )
}

export default HomePage