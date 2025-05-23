const jwt = require('jsonwebtoken')


const authMiddleware = (req,res,next)=>{
    const authHeader = req.headers.authorization
    try{
        if(!authHeader || !authHeader.startsWith("Bearer ")){
            return res.status(404).json("token not found")
        }

        const token = authHeader.split(" ")[1]

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    }
    catch(error){
        res.status(500).json({authMiddleware_error : error.message})
    }
}


module.exports = authMiddleware