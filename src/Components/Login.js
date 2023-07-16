import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

const Login = (props) => {
    const Navigate = useNavigate();
    const[credentials,setcredentials] = useState({email:"",password:""})
    const handleSubmit = async(e) => {
        e.preventDefault()
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
               

            },

            body: JSON.stringify({email:credentials.email,password:credentials.password }),
        });
        const json = await response.json();
        console.log(json)
        if(json.success){
            //redirecting
            localStorage.setItem('token',json.authtoken)
            Navigate("/")
            props.showAlert("Logged in Successfully","success")
        }
        else{
            props.showAlert("Invalid Credentials","danger")
        }
       
    }
    const onChange = (e) =>{
        setcredentials({...credentials,[e.target.name]: e.target.value})
    }
  return (
    <div>
      <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control"  value={credentials.email} id="email" name='email' aria-describedby="emailHelp" onChange = {onChange}/>
    
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control"  value={credentials.password} id="password"  name='password' onChange={onChange}/>
  </div>
  
  <button type="submit" className="btn btn-primary" >Submit</button>
</form>
    </div>
  )
}

export default Login
