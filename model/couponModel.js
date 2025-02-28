import mongoose from "mongoose";

const couponSchema = new mongoose.Schema({
    code:{
        type:String,
        required:true,
        unique:true
    },
    condition: {
        type:String,
        required:true,
    },
    amount:{
        type:Number,
        required:true
    },
    expireDate:{
        type:String,
        required:true,
        default:''
    },
    isActive:{
        type:Boolean,
        required:true,
        default:true
    }
});


export default mongoose.model("coupons",couponSchema);