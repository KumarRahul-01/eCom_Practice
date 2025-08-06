const mongoose= require('mongoose');

const productSchema= new mongoose.Schema({
    Pname:{ type: String, required: true },
    price:{type: Number, required: true },
})

module.exports=mongoose.model('Product', productSchema);