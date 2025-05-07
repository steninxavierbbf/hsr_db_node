import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    telefone:{
        type:String,
        required: true
    },
    shippingAddress:{
        type:String,
        required: true
    },
    place:{
        type:String,
        required: true
    },
    pin:{
        type:String,
        required: true
    },
    country:{
        type:String,
        required: true
    },
    deliveryNote:{
        type:String,
        required: true
    },
    selectedDealer:{
        type:Object,
        required:false
    },
    coupon:{
        type:String,
        required:false
    },
    orderedItems:{
        type:Array,
        required: true
    },
    status:{
        type:Array,
        required:true
    },
    uId:{
        type:String,
        required:true
    },
    total:{
        type:String,
        required:true
    },
    advancePayment:{
        type:String,
        required:true
    },
    balaceAmount:{
        type:String,
        required:true
    },
    couponUsed:{
        type:Array,
        default: []
    },
    molliePayId:{
        type:String,
        required:true
    }
});

export default mongoose.model("orderlist",userSchema);