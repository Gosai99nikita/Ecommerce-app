const mongoose = require('mongoose');
const Review = require('./review');

const productSchema = new mongoose.Schema({
    pname:{
        type:String,
        required:true
    },
    pimg:{
        type:String,
    },
    pprice:{
        type:Number,
        required:true,
        min:0
    },
    pcategory:{
        type:String,
        required:true
    },
    pdesc:{
        type:String,
        required:true
    },
    reviews:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Review'

    }]

});

const Product = mongoose.model('Product',productSchema);
module.exports = Product