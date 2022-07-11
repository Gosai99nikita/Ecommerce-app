const mongoose= require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Product = require('./product');

const userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
    },

    lastname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phonenumber:{
        type:Number,
        required :true
      
    },
    address:{
        type:String,
        required:true,
    },
    userimg:{
        type:String,
        // required:true,
    },
    cart:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product'
        }
    ],
    wishlist:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product'
        }
    ]

});


userSchema.plugin(passportLocalMongoose); // wil add automatically username and salt to pass

const User=mongoose.model('User',userSchema);

module.exports= User;


