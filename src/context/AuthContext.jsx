// import {createContext, useState, useEffect} from "react";

import { useState, useEffect, useContext,createContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

export default function AuthProvider({children}) {
    const [authUser, setAuthUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token")|| "");
    // const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(()=>{
      const token = localStorage.getItem("token");
      if(token){
        getProfile(token);
      }
    },[token]);

    const getProfile = async(token)=>{
      try{
        const {data} = await axios.get(`${import.meta.env.VITE_LOCALHOST}/api/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAuthUser(data);
      } catch(err){
        console.error(`Error authorizing user: ${err}.`);
        setAuthUser(null);
        setToken(null);
        localStorage.removeItem("token");
        navigate("/login");
      }
    }

    const logout = () =>{
      setAuthUser(null);
      setToken(null);
      localStorage.removeItem("token");
    }
    
    // const value = {
    //     authUser,
    //     setAuthUser, 
    //     isLoggedIn,
    //     setIsLoggedIn
    // } -- youtube video code radiance
  return (
    <AuthContext.Provider value={{authUser, setAuthUser, token, setToken, logout}}>
        {children}
    </AuthContext.Provider>
  )
}

export function useAuth(){
    return useContext(AuthContext);
}

