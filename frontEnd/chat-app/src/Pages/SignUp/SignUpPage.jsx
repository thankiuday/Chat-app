import React, { useState } from 'react'
import '../SignUp/SignUpPage.css'
import { Link } from 'react-router-dom'
import useSignUp from '../../Hoocks/useSignUp.js'
const SignUpPage = () => {
    // getting all the input from form 
    const [input,setInput] = useState({
        fullName:'',
        userName:'',
        password:'',
        confirmPassword:'',
        gender:''
    })

    // using signup context for validating the data and make fetch API request
    const {loading,signup}=useSignUp()
    const  handleSubmit = async(e)=>{
        e.preventDefault()
        await signup(input)
       setInput("")
    }
    return (
        <section className="vh-100 gradient-custom">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className=" formBody card bg-transparent text-white" style={{ "borderRadius": "1rem" }}>
                            <div className="card-body p-5 text-center">
                                <div className="md-5 mt-md-4 pb-5">
                                    <h2 className="fw-bold mb-2 text-light ">Long<span className='text-primary'>Talks!</span></h2>
                                    <p className="mb-5 fs-5">Please Sign Up To Continue!</p>
                                    <form onSubmit={handleSubmit}>
                                    <div className="form-outline form-white mb-4">
                                        <input type="text" placeholder='Full Name...' id="fullName" className="form-control form-control-lg  text-light  bg-dark in"
                                        value={input.fullName} onChange={(e)=> setInput({...input,fullName:e.target.value})} />
                                    </div>
                                    <div className="form-outline form-white mb-4">
                                        <input type="text" placeholder='Username...' id="username" className="form-control form-control-lg  text-light  bg-dark in"
                                        value={input.userName} onChange={(e)=> setInput({...input,userName:e.target.value})} />
                                    </div>
                                    <div data-mdb-input-init className="form-outline form-white mb-4">
                                        <input type="password" placeholder='Password...' id="password" className="form-control form-control-lg  text-light  bg-dark in"
                                        value={input.password} onChange={(e)=> setInput({...input,password:e.target.value})} />
                                    </div>
                                    <div data-mdb-input-init className="form-outline form-white mb-4">
                                        <input type="password" placeholder='Confirm Password...' id="confirmPassword" className="form-control form-control-lg  text-light  bg-dark in" 
                                        value={input.confirmPassword} onChange={(e)=> setInput({...input,confirmPassword:e.target.value})}/>
                                    </div>
                                    <div className='text-start fs-5'>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input " type="radio" name="gender" id="inlineRadio1" value="male"
                                            checked={input === 'male'} onChange={(e)=> setInput({...input,gender:e.target.value})} />
                                            <label className="form-check-label" >Male</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="gender" id="inlineRadio2" value="female"
                                            checked={input === 'female'} onChange={(e)=> setInput({...input,gender:e.target.value})} />
                                            <label className="form-check-label" >Female</label>
                                        </div>
                                    </div>
                                    <button data-mdb-button-init data-mdb-ripple-init className="btn btn-outline btn-lg px-5 mt-4 signup-btn" type="submit">Sign Up</button>
                                    </form> 
                                </div>
                                <div>
                                    <p className="mb-0">Already have an account? <Link to="/login" className="text-warning fw-bold">Login</Link>
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

export default SignUpPage