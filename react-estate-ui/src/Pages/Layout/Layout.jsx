import React from 'react'
import Navbar from '../../Components/Navbar'
import "./Layout.scss"
import { Outlet } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Authcontext } from "../../Authcontext"
import { useContext } from 'react'
import { useEffect } from 'react';

 function Layout() {
  return (
    <div className="layout"><Navbar/>
   <Outlet/>
   </div>
  )
}


 function AuthLayout() {
  const {currentuser, updateuser}=useContext(Authcontext)
  const navigate=useNavigate()
  useEffect(()=>{
    if(!currentuser){
      navigate("/login")
    }
},[currentuser, navigate])
  return (
  currentuser&&(  <div className="layout"><Navbar/>
  <Outlet/>
  </div>)
  )
}

export {Layout, AuthLayout}