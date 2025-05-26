const express = require("express");
const router = express.Router();
const users = require("../Schema&Models/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../Middlewares/authMiddleware");
const RBAC_Middleware = require("../Middlewares/RBAC_Middleware")


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

        res.status(200).json({ message: "Login Successfully", token ,role:userExisted.role, name:userExisted.name, id:userExisted._id});
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


router.patch('/changePassword',authMiddleware, async (req, res) => {
  const { id, oldPass, newPass } = req.body;

  try {
    const user = await users.findOne({ _id: id });
    if (!user) return res.status(404).json({ message: "User not found" });

    const matchPass = await bcrypt.compare(oldPass, user.password);
    if (!matchPass) return res.status(403).json({ message: "Invalid password" });

    const newHashPass = await bcrypt.hash(newPass, 10);
    user.password = newHashPass;
    await user.save();

    res.status(200).json({ success: true, message: "Password changed successfully" });
  } catch (error) {
    res.status(500).json({ userDetailsErrors: error.message });
  }
});



router.get("/allUsers", authMiddleware, RBAC_Middleware(["admin", "store manager"]), async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});





module.exports = router;
