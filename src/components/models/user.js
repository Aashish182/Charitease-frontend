const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    gmail:{
        type: String,
        required: true,
        unique: true
    },
    number:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    }
    
});

const UserModel = mongoose.model('Signup',UserSchema);
module.exports = UserModel;