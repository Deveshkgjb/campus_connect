const mongoose=require('mongoose')

const StartupRegisterSchema=new mongoose.Schema({
    studentId:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    StartupId:{type:mongoose.Schema.Types.ObjectId,ref:'Startup'},
    Message:String,
    AppliedAt:{type:Date,default:Date.now}
})

module.exports = mongoose.models.StartupRegister || mongoose.model('StartupRegister', StartupRegisterSchema);