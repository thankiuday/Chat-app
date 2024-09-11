import React, { useState } from 'react'
import '../Login/Login.css'
import { Form, Link } from 'react-router-dom'
import useLogin from '../../Hoocks/useLogin'
const login = () => {
  const [username,setUsername] = useState("")
  const [password,setPassword] = useState("")

  const {login,loading} = useLogin()
  const handleSubmit = async(e)=>{
    e.preventDefault()
    await login(username,password)
  }
  return (
    <section className="vh-100 gradient-custom">
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-12 col-md-8 col-lg-6 col-xl-5">
        <div className=" formBody card bg-transparent text-white" style={{"borderRadius": "1rem"}}>
          <div className="card-body p-5 text-center">
            <div className="md-5 mt-md-4 pb-5">
              <h2 className="fw-bold mb-2 text-light ">Long<span className='text-primary'>Talks!</span></h2>
              <p className="mb-5 fs-5">Please enter your username and password!</p>
              {/* calling handle submit function */}
              <form onSubmit={handleSubmit}>
              <div className="form-outline form-white mb-4">
                <input type="text" placeholder='username...' id="typeEmailX" className="form-control form-control-lg  text-light  bg-dark in" 
                value={username} onChange={(e)=>{setUsername(e.target.value)}} />
              </div>
              <div data-mdb-input-init className="form-outline form-white mb-4">
                <input type="password" placeholder='password...' id="typePasswordX" className="form-control form-control-lg  text-light  bg-dark in" 
                value={password} onChange={(e)=>{setPassword(e.target.value)}} />
              </div>
              <button data-mdb-button-init data-mdb-ripple-init className="btn btn-outline btn-lg px-5 login-btn" 
              disabled={loading}>Login</button>
              </form>
              {/* end of form tag */}
            </div>
            <div>
              <p className="mb-0">Don't have an account? <Link to="/signup" className="text-warning fw-bold">Sign Up</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
  )
}

export default login