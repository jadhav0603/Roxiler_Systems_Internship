import { createContext, useState,useEffect } from "react";

export const ContextAPI = createContext("")


export const ContextAPIprovider = ({children})=>{
    
    const [userName, setUserName] = useState()
    const [store, setStore] = useState([])
    const [id,setId] = useState()

    return(
        <ContextAPI.Provider value={{userName, setUserName, store, setStore,id,setId} } >
            {children}
        </ContextAPI.Provider>
    )
} 


