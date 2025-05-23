import React, { useState } from 'react'
import axios from 'axios'

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/user/login', {
        email,
        password
      })

      console.log("login Success : ",response.data)
      localStorage.setItem('token', response.data.token)

    } catch (error) {
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
