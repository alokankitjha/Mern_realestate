import React, { useState } from 'react'
import logo from "../../public/logo.png"
import "./Navbar.scss"
import menu from "../../public/menu.png"
import { Link } from 'react-router-dom'
import {userata} from "../Lib/Dummydata"
import { Authcontext } from "../Authcontext"
import { useContext } from 'react'
import { apiRequest } from '../Lib/Apirequest'

export default function Navbar() {
  const [open ,close]=useState(true)
  const {currentuser,updateuser}=useContext(Authcontext)
  console.log(currentuser)

  const handleLogout = async () => {
    try {
      await apiRequest.post("logout");
      updateuser(null);
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };
  
 // console.log(currentuser.message.username)
  //const user=true
  return (
   <nav>
    <div className='left'>
       <a className='logo' href='/'> <img src={logo}></img>
        <span>Alok EState</span></a>
        <a>Home</a>
        <a>About</a>
        <a>Contact</a>
        <a>Agents</a>
    </div>
    <div className='right'>
       {currentuser?(<div className='usernav'>
        <img src={ currentuser.message.avatar || userata.img}/><span>{currentuser.message.username}</span>
        <Link to="./profile"  ><span>1</span>
        <div>Profile</div></Link>  <button onClick={handleLogout} className="logout">log out</button>
       </div>):(<> <a href='/login'> sign in</a> 
        <a className='register' href='/register'> sign up</a></>)}
        <div onClick={()=>{close(!open)}} className="menuicon">
          <img src={menu}/>
        </div>
        <div className={open?"menu":"menu2"}>
        <a>Home</a>
        <a>About</a>
        <a>Contact</a>
        <a>Agents</a>
        <a>sign in</a>
        <a>sign up</a>
        <a>profile</a>
      

        </div>
    </div>
   </nav>
  )
}
