import React, { useContext } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ContextAPI } from './ContextAPI'



const Register = () => {
    const{setIsLogin} = useContext(ContextAPI)

    const navigate = useNavigate()

    const handleRegister = async (e) => {
        e.preventDefault()

        const name = e.target.name.value
        const email = e.target.email.value
        const address = e.target.address.value
        const password = e.target.password.value

        if (name.length > 20) return alert("name should be less than 20 characters")
        if (address.length > 400) return alert("address should be less than 400 characters")
        if (!/^(?=.*[A-Z])(?=.*\W).{8,16}$/.test(password)) {
            return alert("Password must be 8-16 chars with 1 capital & 1 special char");
        }

        try {
            const response = await axios.post('http://localhost:3000/user/register', {
                name, email, address, password
            })
            console.log(response.data)
            setIsLogin(true)
            // navigate('/loginModel')

        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <div>
            <form onSubmit={handleRegister}>
                <label htmlFor="name" >Name</label> <br />
                <input type='text' name="name" placeholder="Enter your Full Name"/> <br />

                <label htmlFor="email"> E-Mail</label> <br />
                <input type="email" name="email" placeholder="Enter your E-mail address" /> <br />

                <label htmlFor="address"> Address</label>   <br />
                <input type="text" name="address" placeholder="Enter your address"/> <br />

                <label htmlFor="password" > Password </label> <br />
                <input type="password" name="password" placeholder="Enter your password"/> <br />

                <button type='submit'>Submit</button>
            </form>

        </div>
    )
}

export default Register
