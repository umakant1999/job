//usermodel.js
const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    userid:mongoose.Schema.Types.ObjectId,
    savedJobs:[{type:mongoose.Schema.Types.ObjectId,ref:'Job'}],
    appliedJobs:[{type:mongoose.Schema.Types.ObjectId,ref:'Job'}]

        

});
module.exports=mongoose.model('User',userSchema);
