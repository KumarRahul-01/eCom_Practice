const mongoose=require('mongoose');

const imgSchema=new mongoose.Schema({
    img:{ type: String, required: true },
    productId:{type:mongoose.Schema.Types.ObjectId, ref:'Product',}
})

module.exports=mongoose.model('Image', imgSchema);