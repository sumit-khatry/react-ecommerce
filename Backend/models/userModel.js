const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"please enter your name"],
        maxlength:[30,"cnnot excced more then 30 charater"],
    },
    email:{
        type:String,
        required:[true,"please enter your Email"],
        unique:true,
        validate:[validator.isEmail,"please enter valid Email"],

    },
    password:{
        type:String,
        required:[true,"please enter your password"],
        maxlength:[8,"please password more then  charater"],
        select:false,//to not provide password to the any users
    },
    avatar:{
        public_id:{
            type:String,
            required:true,
            
        },
        url:{
            type:String,
            required:true,
            
        }
    },
    role:{
        type:String,
        default:"admin",
    },
    createdAt:{
        type:Date,
        default: Date.now,
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date,
});
//to secure the password from hacking and save is the event
 userSchema.pre("save", async function (next) {
     //this condition helps to prevent the password to be double hash.
     if (!this.isModified("password")) {
       next();
     }
     //if the password is change than it hash the password
    this.password = await bcrypt.hash(this.password, 10);
});
//JWT TOKEN
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
  };
//comparing password 
userSchema.methods.comparePassword = async function(enterPassword){
    return await bcrypt.compare(enterPassword,this.password);
};
//Generating password reset for token
userSchema.methods.getResetPasswordToken = function(){

    //generating token
    const resetToken = crypto.randomBytes(20).toString("hex");//hex is used to remove the buffer value 

    //hashing and adding to userSchema
    this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

    //seting time for token expire
    this.resetPasswordExpire = Date.now()+ 15*60*1000;
    return resetToken;
};

module.exports = mongoose.model("user",userSchema);