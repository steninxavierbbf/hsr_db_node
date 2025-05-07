import orderlist from '../model/userModel.js';
import userModel from '../model/userModel.js';



export const createANewOrder = async (req,res)=>{
    try{
  const userData = new orderlist(req.body);
  const savedUser = await userData.save();
  res.status(200).json(savedUser);
    }
    catch(error){
       res.status(500).json({error:error});
    }
}
