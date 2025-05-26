
const RBAC_Middleware = (roles)=>{
    return((req,res,next)=>{
             console.log("User Role:", req.user?.role); // 🔍 log this
             console.log("Allowed Roles:", roles); 

            if(!roles.includes(req.user.role)){
                return res.status(403).json("access denied")
            }

            next();
        }
    )
}

module.exports = RBAC_Middleware