const express = require("express");
const router = express.Router();
const users = require("../Schema&Models/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const userExisted = await users.findOne({ email });
        if (!userExisted) {
            return res.status(404).json({ message: "user not found" });
        }

        const checkPass = await bcrypt.compare(password, userExisted.password);

        if (!checkPass) {
            return res.status(403).json({ message: "invalid credential" });
        }

        const token = await jwt.sign(
            {
                userId: userExisted._id,
                role: userExisted.role,
                email: userExisted.email
            },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(200).json({ message: "Login Successfully", token });
    } catch (error) {
        res.status(500).json({ login_error: error.message });
    }
});



router.post('/register',async(req,res)=>{
    const{name,email,address,password} = req.body

    try{
        const user = await users.findOne({email})

        if(user){
            return res.status(409).json({message:"user already existed"})
        }

        const hashPass = await bcrypt.hash(password, 10)

        const newUser = new users({name,email,address, password:hashPass})
        await newUser.save()

        res.status(201).json('user registered successfully')
    }
    catch(error){
        res.status(500).json({register_error:error.message})
    }

})



module.exports = router;
