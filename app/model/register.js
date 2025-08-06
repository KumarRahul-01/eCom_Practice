const mongoose=require('mongoose');

const regSchema=new mongoose.Schema({
    registerBy:{type:String},
    productId:{type:mongoose.Schema.Types.ObjectId, ref:'Product'},
})

module.exports=mongoose.model('Register', regSchema);