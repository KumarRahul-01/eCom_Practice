const mongoose=require('mongoose');

const ratingSchema= new mongoose.Schema({
    rating:{type:Number},
    productId:{type:mongoose.Schema.Types.ObjectId,ref:'Product'},
})

module.exports=mongoose.model('Rating',ratingSchema);