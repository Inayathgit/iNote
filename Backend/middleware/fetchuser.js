var jwt = require('jsonwebtoken');
const JWT_SEC = "inayathisagoodb$0y";
const fetchuser = (req,res,next)=>{
   const token = req.header('auth-token')
   if(!token){
    res.status(401).send("Please login using valid authentication")
   }
   try {
    const data = jwt.verify(token,JWT_SEC)
   req.user = data.user
   next();
   } catch (error) {
    res.status(401).send("Please login using valid authentication")
   }
   
}
module.exports =fetchuser;
