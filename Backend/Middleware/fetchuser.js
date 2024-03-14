const jwt = require('jsonwebtoken');
const JWT_Secreat="Itsnotstrongpsk"

const fetchuser=(req,res,next)=>{
    //get the user from jwt token & add id to req object 
    const token =req.header('auth-token');
    if(!token){
         res.status(401).send({"error":"Please authenticate using a valid token"});
    }

    try {
        const data=jwt.verify(token,JWT_Secreat)
        req.user=data.user; // Change this line
        next();
        
    } catch (error) {
         res.status(401).send({"error":"Please authenticate using a valid token"});
    }
}

module.exports = fetchuser;