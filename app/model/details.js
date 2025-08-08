const mongoose= require('mongoose');

const detailsSchema= new mongoose.Schema({
    size:{type:Number},
    color:{type:[String]},
    price:{type:Number},
    productId:{type:mongoose.Schema.Types.ObjectId, ref:'Product'}
})

module.exports= mongoose.model('Details', detailsSchema);