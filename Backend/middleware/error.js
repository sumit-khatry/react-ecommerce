//importing the class errorhander
const ErrorHandler= require("../utils/errorhander");




module.exports=(err,req,res,next)=>{
    err.statusCode = err.statusCode || 500; //server issues
    err.message = err.message || "Internal Server Error";

    //to hanlde wrong mongodb ID error
    // if(err.name === "CastError"){
    //     const message =`resource not found.Invalid:${err.path}`;
    //     err= new ErrorHandler(message,400);
    // }
     
    //Mongoose duplicate key error
    // if(err.code === 11000){
    //     const message =`Duplicate ${Object.keys(err.keyValue)} Entered`;
    //     err= new ErrorHandler(message,400);
    // }

    //Wrong JWT error
    // if(err.name === "JsonWebTokenError"){
    //     const message =`Json web token is invalid,Try Again`;
    //     err= new ErrorHandler(message,400);
    // }

      // JWT EXPIRE error
    // if(err.name === "TokenExpiredError"){
    //     const message =`Json web token is Expired,Try Again`;
    //     err= new ErrorHandler(message,400);
    // }

    //sending to the response
    res.status(err.statusCode).json({
        success:false,
        message:err.message,//to know the actual position of the error
    });
};