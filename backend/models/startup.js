const mongoose=require('mongoose');
const StartupSchema=new mongoose.Schema({
   ownerId:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
   name:String,
   description:String,
   website:String,
   createdAt:{type:Date,default:Date.now}
})

module.exports = mongoose.models.Startup || mongoose.model('Startup', StartupSchema);