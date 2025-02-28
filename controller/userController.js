import orderlist from '../model/userModel.js';
import couponModel from '../model/couponModel.js';
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

export const getAllUsers = async (req,res)=>{
  try{
    const users = await  orderlist.find();
    if(users.length === 0){
      res.status(404).json({message:"The user is not found"});
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
      res.status(404).json({message:"The user is not found"});
    } else{
      res.status(200).json(user);
    }
  }  
  catch(error){
    res.status(500).json({message:error.message});
  }
}
export const cancelOrder = async(req,res)=>{
  const date = new Date().toLocaleString(undefined, {year: 'numeric', month: '2-digit', day: '2-digit', weekday:"long", hour: '2-digit', hour12: false, minute:'2-digit', second:'2-digit'});
  try{
    const {uId}= req.body;
    const findUser = (await orderlist.find()).filter((user)=> user.uId === uId);
    if(findUser.length > 0){
      const updateUser = await orderlist.findByIdAndUpdate(findUser[0]._id,{$push:{status:{time:date,statusText:"abgesagt"}}});
      res.status(200).json(updateUser);
    }else{
      res.status(404).json({message:"The user is not found"});
    }
    
  }
  catch(error){
    res.status(500).json({message:error.message});
  }
}

export const updateOrder = async(req,res)=>{
  const date = new Date().toLocaleString(undefined, {year: 'numeric', month: '2-digit', day: '2-digit', weekday:"long", hour: '2-digit', hour12: false, minute:'2-digit', second:'2-digit'});
  try{
    const {uId}= req.body;
    const {status} = req.body;
    const findUser = (await orderlist.find()).filter((user)=> user.uId === uId);
    if(findUser.length > 0){
      const updateUser = await orderlist.findByIdAndUpdate(findUser[0]._id,{$push:{status:{time:date,statusText:status}}});
      res.status(200).json(updateUser);
    }else{
      res.status(404).json({message:"The user is not found"});
    }
    
  }
  catch(error){
    res.status(500).json({message:error.message});
  }
}


export const trackOrder = async(req,res)=>{
  try{
    const {uId}= req.body;
    const findUser = (await orderlist.find()).filter((user)=> user.uId === uId);
    if(findUser.length > 0){
      const trackUser = await orderlist.findById(findUser[0]._id);
      res.status(200).json({status:trackUser});
    }else{
      res.status(404).json({message:"The user is not found"});
    }

  }catch(error){
    res.status(500).json({message:error.message});
  }
}



export const createACoupon = async(req,res)=>{
 try{
   const coupons = new couponModel(req.body);
   const savedCoupons = coupons.save();
   res.status(201).json({coupon:savedCoupons})
 }
 catch(error){
   res.status(500).json({message:error.message})
 }

}



export const checkCoupons = async(req,res)=>{
  const {coupon}= req.body;
  const {email} = req.body;
  try{
    const isCouponValid = (await couponModel.find()).filter((code)=> code.code === coupon);
    if(isCouponValid &&  isCouponValid[0].isActive === true){
      const findUser = (await userModel.find()).filter((user)=>user.email === email);

      if(isCouponValid[0].code === "NEWYEAR150"){
        const usedCoupons =  findUser.find((user)=> user.couponUsed.includes(coupon));
        if(usedCoupons){
          res.status(404).json({error:"Sie haben diesen Coupon bereits verwendet"});
         }else{
          res.status(201).json({amount:isCouponValid[0].amount,message:"Den Coupon erfolgreich angewendet"});
         }
      }

      if(isCouponValid[0].code === "BBF2025"){
        const findGrandTotal = findUser.reduce((acc,curr)=>{
         return acc += Number(curr.total)
        },0);
         if(findGrandTotal > Number(isCouponValid[0].condition)){
        const usedCoupons =  findUser.find((user)=> user.couponUsed.includes(coupon));
         if(usedCoupons){
          res.status(404).json({error:"Sie haben diesen Coupon bereits verwendet"});
         }else{
          res.status(201).json({amount:isCouponValid[0].amount,message:"Den Coupon erfolgreich angewendet"});
         }
         }else{
          res.status(404).json({error:"Sie können diesen Coupon nicht einlösen"});
         }
      }
   
    }else{
      res.status(404).json({error:"Ungültiger Coupon"});
    }
    }catch(error){
      res.status(500).json({message: error.message})
    }
}