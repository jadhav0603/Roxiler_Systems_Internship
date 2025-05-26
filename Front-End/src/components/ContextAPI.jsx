import { createContext, useState,useEffect } from "react";

export const ContextAPI = createContext("")


export const ContextAPIprovider = ({children})=>{
    
    const [userName, setUserName] = useState()
    const [store, setStore] = useState([])
    const [id,setId] = useState()
    const [isLogin, setIsLogin] = useState(true);

    return(
        <ContextAPI.Provider value={{userName, setUserName, store, setStore,id,setId , isLogin, setIsLogin} } >
            {children}
        </ContextAPI.Provider>
    )
} 


