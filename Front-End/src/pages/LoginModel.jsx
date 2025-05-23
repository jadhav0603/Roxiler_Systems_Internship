import React, { useState } from 'react'
import Login from '../components/Login'
import Register from '../components/Register'

const LoginModel = () => {

    const [container, setContainer] = useState(<Login/>)

    const handleLogin = ()=>{
        setContainer(<Login/>)
    }

    const handleRegister = ()=>{
        setContainer(<Register />)
    }

  return (
    <div>
      <div> 
        <h1 onClick={()=>handleLogin()}>LOGIN</h1>
        <h1 onClick={()=>handleRegister()}> REGISTER</h1>
      </div>
      <div>
        {container}
      </div>
    </div>
  )
}

export default LoginModel
