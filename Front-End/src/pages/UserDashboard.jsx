import React, { useContext, useEffect } from 'react'
import { ContextAPI } from '../components/ContextAPI'
import { storeData } from '../functions/storeData'



const UserDashboard = () => {

    const {store, setStore, userName} = useContext(ContextAPI)
    

    useEffect(()=>{
        async function fetchData(){
            const data = await storeData()
            setStore(data)
        }

        fetchData()
    },[])


  return (
    <div>
        <h1>WELCOME,</h1> 
        <h3>{userName}</h3>

    </div>
  )
}

export default UserDashboard