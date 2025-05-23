
const RBAC_Middleware = (...role)=>{
    return((req,res,next)=>{
            if(!role.includes(req.user.role)){
                return res.status(403).json("access denied")
            }

            next();
        }
    )
}

module.exports = RBAC_Middleware