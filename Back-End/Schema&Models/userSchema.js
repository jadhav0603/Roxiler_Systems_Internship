const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    password:{
        type: String,
        required:true
    },
    role:{
        type:String,
        enum:['admin', 'store Manager', 'user']
    }
})

const userModel = mongoose.model('users',userSchema)

module.exports = userModel