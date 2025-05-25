import React, { useState, useContext } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ContextAPI } from './ContextAPI'


const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const{setUserName,setId} = useContext(ContextAPI)  
  
  const navigate = useNavigate()
  

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/user/login', {
        email,
        password
      })

      console.log("login Success : ",response.data)
      localStorage.setItem('token', response.data.token)

      setUserName(response.data.name)
      const userId = response.data.id
      setId(userId)
      // console.log(response.data.name)

      const role = response.data.role
      
      if(role === 'admin'){
        navigate('/adminDashboard')
      }
      else if(role === 'store manager'){
        navigate('/storeDashboard')
      }
      else if(role === 'user'){
        navigate('/userDashboard')
      }

    } catch (error) {
      alert(error.response.data.message)
      console.log('login Error : ',error.message)
    }

  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          value={email}
          placeholder="Enter your E-mail address"
          onChange={(e) => setEmail(e.target.value)}
        /> <br />
        <input
          type='password'
          value={password}
          placeholder="Enter your E-mail address"
          onChange={(e) => setPassword(e.target.value)}
        /> <br />
        <button type='submit' > Submit </button>
      </form>
    </div>
  )
}

export default Login
