import orderCheck from '../model/adminModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'


export const register = async(req,res)=>{
  try{
     const {username,password,role}= req.body;
     const hashedPassword = await bcrypt.hash(password,10);
     const admin = new orderCheck({username,password:hashedPassword,role});
     await admin.save();
     res.status(201).json({ message: 'User registered successfully' });
  }
  catch(error){
   res.status(500).json({ error: 'Registration failed' });
  }
}

export const adminLogin = async (req,res)=>{
try{
 const {username,password} = req.body;
 const admin = await orderCheck.findOne({username});
 if(!admin){
   return res.status(401).json({error:'failed'});
 }
 const passwordMatch = await bcrypt.compare(password,admin.password);
 if(!passwordMatch){
   return res.status(401).json({error:'failed'});
 }
 const token = jwt.sign({userId:admin._id},process.env.SECRET_KEY,{expiresIn:'1h'});
 res.status(200).json({token:token,expireIn:"1h",status: 200,role:admin.role});
}
catch(error){
    res.status(500).json({error:error});
}
}