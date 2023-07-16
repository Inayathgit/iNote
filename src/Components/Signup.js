import { toBeDisabled } from '@testing-library/jest-dom/matchers';
import React from 'react'
import { useState } from 'react'
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  const Navigate = useNavigate();
  const[credentials,setcredentials] = useState({email:"",password:"",name:"",cpassword:""})
  const handleSubmit = async(e) => {

    const{name,email,password,cpassword} = credentials

    e.preventDefault()
    
    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
        method: "POST",

        headers: {
            "Content-Type": "application/json",
           

        },

        body: JSON.stringify({name,email,password }),
    });
    const json = await response.json();
    console.log(json)
        if(json.success){
        //redirecting
        localStorage.setItem('token',json.authtoken)
        Navigate("/")
        props.showAlert("Account created successfully","success")
        }
        else{
         
          props.showAlert("Invalid crdentials","danger")
        }
       
        
       
  }
  

const onChange = (e) =>{
    setcredentials({...credentials,[e.target.name]: e.target.value})
    if(document.getElementById('cpassword')&&document.getElementById('password')){
      if(document.getElementById('cpassword').value!==document.getElementById('password').value){
        document.getElementById('submitbtn').disabled = true
        props.showAlert("Password do not match","danger")
      }
      else{
        document.getElementById('submitbtn').disabled = false
      }
}

}

// document.getElementById('cpassword')!= document.getElementById('password')?console.log("not equal"):console.log('equal')

  return (
    <div>
      <form  onSubmit={handleSubmit} >
      <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" id="name" name = 'name' aria-describedby="emailHelp"  onChange={onChange}/>
    
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" onChange={onChange}/>
    
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password"  className="form-control" id="password" name='password' required minLength={5} onChange={onChange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
    <input type="cpassword" className="form-control" id="cpassword" name='cpassword' required minLength={5} onChange={onChange}/>
  </div>
  
  <button type="submit" id='submitbtn' className="btn btn-primary"   >Submit</button>
</form>
    </div>
  )
}

export default Signup
