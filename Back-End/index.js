const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
require('dotenv').config()

const PORT = process.env.PORT


const userAuth = require('./Routes/usersAuth.js')
const storeRoute = require('./Routes/storeRoutes')

app.use(express.json())
app.use(cors())


app.use('/user', userAuth)
app.use('/store', storeRoute)


app.listen(PORT,()=>{
    try {
        mongoose.connect(process.env.MONGO_URL)
        console.log("server successfully connected to MONGODB")
        console.log(`server successfully running on ${PORT}`)
    } catch (error) {
        console.log(error.message)
    }
})