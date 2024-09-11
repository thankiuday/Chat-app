import { useContext, useState } from 'react'
import './App.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './Pages/Home/HomePage';
import Login from './Pages/Login/Login'
import SignUp from './Pages/SignUp/SignUpPage'
import { Navigate, Route, Routes } from 'react-router-dom';
import {Toaster} from 'react-hot-toast'
import   { useAuthContext } from './Context/AuthContext';
function App() {
  const {authUser} = useAuthContext()
  return (
    <div className='mainDiv'>
      <div className='mainBody'>
        <Routes>
          <Route path='/' element={authUser? <HomePage/>: <Navigate to={"/login"}/>}/>
          <Route path='/login' element={authUser? <Navigate to='/'/> : <Login/>}/>
          <Route path='/signup' element={authUser? <Navigate to='/'/> : <SignUp/>}/>
        </Routes>
        <Toaster/>
      </div>
    </div>
  )
}

export default App
