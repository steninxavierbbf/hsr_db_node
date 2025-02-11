import jwt from 'jsonwebtoken';

export const validateToken = (req,res,next)=>{
const authHeader = req.headers["authorization"]
const token = authHeader.split(" ")[1];
if(token === null){
    res.sendStatus(400).send("token is not presented");
}
jwt.verify(token,process.env.SECRET_KEY,(err,user)=>{
    if(err){
        res.status(403).send("token is invalid");
    }else{
        req.user = user;
        next();
    }
})
}