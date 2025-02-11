import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    }
});

export default mongoose.model("order-check-keys",adminSchema);