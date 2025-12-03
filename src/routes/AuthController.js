const UserModel = require("./components/models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signup = async (req,res) => {
    try{
        const {name,gmail,number,password} = req.body;
        const user = await UserModel.findOne({gmail});
        if(user) {
            return res.status(409)
                .json({message: 'User is Already Exists, you can Login', success: false});
        }
        const userModel = new UserModel({name,gmail,number,password});
        userModel.password = await bcrypt.hash(password,10);
        await userModel.save();
        res.status(201)
            .json({
                message: "Signup successful",
                success: true
            })
    }catch(err){
        res.status(500)
            .json({
                message: "Internal server error",
                success: false
            })
    }
}

const login = async (req,res) => {
    try{
        const {gmail,password} = req.body;
        const user = await UserModel.findOne({gmail});
        const errormsg = 'Auth failed email or password is wrong';
        if(!user) {
            return res.status(403)
                .json({message: errormsg, success: false});
        }
        const isPassEqual = await bcrypt.compare(password,user.password);
        if(!isPassEqual) {
            return res.status(403)
                .json({message: errormsg, success: false});
        }
        const jwtToken = jwt.sign(
            {gmail: user.gmail, _id: user._id},
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        )
        res.status(200)
            .json({
                message: "Login successful",
                success: true,
                jwtToken,gmail,name: user.name
            })
    }catch(err){
        res.status(500)
            .json({
                message: "Internal server error",
                success: false
            })
    }
}

module.exports = {
    signup,
    login
}