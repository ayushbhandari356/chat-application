// import React from 'react'
import { createContext,useState,useContext } from "react"

export const AuthContexts = createContext();

export const useAuthContext=(  )=>{
    return useContext(AuthContexts)
}

export const AuthContextsProvider = ({children}) => {
    const [authUser,setAuthUser]=useState(JSON.parse(localStorage.getItem("chat-user"))||null)
 
    return <AuthContexts.Provider value={{authUser,setAuthUser}}>
        {children}
    </AuthContexts.Provider> 
}


