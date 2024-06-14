import "./Register.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"
import { useState } from "react";
import { apiRequest } from "../../Lib/Apirequest";

function Register() {
    const [error ,seterror]=useState("")
    const navigate =useNavigate()
const handlesubmit=async(e)=>{
    e.preventDefault();
    const formData = new FormData(e.target);
    const username= formData.get("username")
    const email =formData.get("email")
    const password =formData.get("password")
try {
    const res=await  apiRequest.post("register",{
    username,email,password
});             navigate("/login")
} catch (error) { console.log(error);
    seterror(error.response.data.message)
}
   

}

  return (
    <div className="registerr">
      <div className="formContainer">
        <form onSubmit={handlesubmit}>
          <h1>Create an Account</h1>
          <input name="username" type="text" placeholder="Username" />
          <input name="email" type="text" placeholder="Email" />
          <input name="password" type="password" placeholder="Password" />
          {error && <span>{error}</span>}
          <button >Register</button>
          <Link to="/login">Do you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Register;