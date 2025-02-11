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
        type:String,
        required:true
    }
});

export default mongoose.model("orderlist",userSchema);