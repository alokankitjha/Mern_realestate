

import { createContext, useEffect, useState } from "react";

export const  Authcontext= createContext()



 export const Authcontextprovider=({children})=>{
    const [currentuser ,newuser]=useState(
    JSON.parse(localStorage.getItem("user"))|| null
    )

  const updateuser=(data)=>{
newuser(data)
    }

    useEffect(()=>{
localStorage.setItem("user",JSON.stringify(currentuser))
    },[currentuser])
   
    return <Authcontext.Provider value={{currentuser ,updateuser}}>
{children}
    </Authcontext.Provider>
}

