import orderlist from '../model/userModel.js';


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

export const getAllUsers = async (req,res)=>{
  try{
    const users = await  orderlist.find();
    if(users.length === 0){
      res.status(404).json({message:"user is not found"});
    }
    else{
      res.status(200).json({users:users,message:req.user});
    }

  }
  catch(error){
    res.status(500).json({error:error});
  }
}

export const deleteUser = async(req,res)=>{
  try{
    const {id} = req.params;
    const user = await orderlist.findByIdAndDelete(id);
    if(!user){
      res.status(404).json({message:"user is not found"});
    } else{
      res.status(200).json(user)
    }
  }  
  catch(error){
    res.status(500).json({message:error.message});
  }
}