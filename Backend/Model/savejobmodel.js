//save job model
const mongoose=require('mongoose');
const savejobSchema=new mongoose.Schema({
    title:String,
    company:String,
    location:String,
    userId:mongoose.Schema.Types.ObjectId,
    salary:String,
    description:String
});
module.exports=mongoose.model('Savejob',savejobSchema)