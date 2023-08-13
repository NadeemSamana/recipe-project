// const { string } = require('joi');
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        trim:true,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    role:{
        type:String,
        default:'buyer'
    }
    // password:{
    //     type:String,
    //     required:true
    // }
})

UserSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', UserSchema);

module.exports = User;


