import "./Login.scss";
import { Link ,json,useNavigate } from "react-router-dom";
import axios from "axios"
import { useState } from "react";
import {Authcontext} from "../../Authcontext"
import { useContext } from "react";
import {apiRequest} from "../../Lib/Apirequest";

function Login() {
  const {updateuser}=useContext(Authcontext)

  const [error ,seterror]=useState("")
  const [loading,isloading]=useState(false)
  const navigate =useNavigate()
const handlesubmit=async(e)=>{
  e.preventDefault();
  isloading(true)
  const formData = new FormData(e.target);

  const email =formData.get("email")
  const password =formData.get("password")
try {
  const res=await  apiRequest.post("login",{
  email,password
});  
updateuser(res.data)     
    // localStorage.setItem("user", JSON.stringify(res.data))     
     navigate("/"); 

//console.log(res.data)

} catch (error) { console.log(error);
  seterror(error.response.data.message)
} finally{isloading(false)}
 
}


  return (
    <div className="login">
      <div className="formContainer">
        <form onSubmit={handlesubmit}>
          <h1>Welcome back</h1>
          <input name="email" type="email" placeholder="email" />
          <input name="password" type="password" placeholder="Password" />
          {error && <span>{error}</span>}
          <button disabled={loading}>Login</button>
          <Link to="/register">{"Don't"} you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Login;