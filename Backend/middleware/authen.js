const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel.js");
const ErrorHander = require("../utils/errorhander");


//exporting
exports.isAuthenticationUser= catchAsyncError( async( req,res,next)=>{
    const {token} = req.cookies;
    
    if(!token){
        return next(new ErrorHander("Please login to access this resources",401));
    }
    const decodedData = jwt.verify(token,process.env.JWT_SECRET);
    req.user = await User.findById(decodedData.id);
    next();

});
//importing function for admin role
exports.authorizeRoles =(...roles)=>{   //admin get access here
    return (req, res,next)=>{
        //checking whether the admin is user or not
        if(!roles.includes(req.user.role)){
            return next (
                new ErrorHander(
                    `Role:${req.user.role} is not allowed to access this resources`,
                    403  //status code coz server has understand what are you trying to do but it refuses 
                ) 
            );
        }
        next();
    };
}