import React, { useState,useEffect } from 'react'
import axios from 'axios'


const StoreDashboard = () => {
  const [store,setStore] = useState([])

  useEffect(async ()=>{
    try {
      const response = await axios.get()

      console.log(response.data)
      setStore(response.data)

    } catch (error) {
      console.log(error.message)
    }
  },[store])

  return (
    <div>
      <h1>WELCOME, </h1>
      <button> ADD STORE </button>
      <div>
        <form>
            <label>Store Name</label> <br />
            <input type='name' name='name' /> <br/>
            <label> Address</label><br/>
            <input type='text' name="address"></input><br/>
        </form>
      </div>

      <div>
        {
            store.map((ele,i)=>(
                <div>
                <h4>{ele.name}</h4>
                <p>{ele.address}</p>
                <p>{ele.rating}</p>
                <button>Edit</button>
                <button>Delete</button>
                </div>
            ))
        }
      </div>
    </div>
  )
}

export default StoreDashboard
