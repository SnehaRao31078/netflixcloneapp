const mongoose=require("mongoose");
const planSchema=new mongoose.Schema({
    email:String,
    card:String,
    holder:String,
    country:String,
    plan: String,
    price: Number 

});
const planModel=mongoose.model("subscribe",planSchema)
module.exports=planModel;

