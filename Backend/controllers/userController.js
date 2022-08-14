const ErrorHander = require("../utils/errorhander.js");
const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../models/userModel.js");
const sendToken = require("../utils/jwtToken.js");
const sendEmail = require("../utils/sendEmail.js");
const crypto = require("crypto");
const cloudinary = require("cloudinary");


//register the users

exports.registerUser = catchAsyncError(async(req,res,next)=>{ 
  
  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar,{
    folder: "avatars",
    width:150,
    crop:"scale",
  })


    const{name,email,password} =req.body;
    console.log(req.body)
    // const user = await User.create(req.body    
    // );
    const user = await User.create({
       
        name,email,password, 
        avatar:{
           public_id:myCloud.public_id,
           url:myCloud.secure_url,
        },
    });
   
    //for generating the token.
    sendToken(user,201,res);
});
    //login the user
    
exports.loginUser = catchAsyncError(async (req, res, next) => {

  const { email, password } = req.body;
      
  // checking if user has given password and email both
      
  if (!email || !password) {
     return next(new ErrorHander("Please Enter Email & Password", 400));
  }
        //to find user in database by using findone method
  const user = await User.findOne({ email }).select("+password");
      
  if (!user) {
    return next(new ErrorHander("Invalid email or password", 401));
  }
      
  const isPasswordMatched = await user.comparePassword(password);
      
  if (!isPasswordMatched) {
    return next(new ErrorHander("Invalid email or password", 401));
  }
  sendToken(user,200,res);

});
//logout the user
exports.logout = catchAsyncError(async( req, res, next)=>{
  res.cookie("token",null,{
    expires:new Date(Date.now()),
    httpOnly:true,
  });

  res.status(200).json({
    success:true,
    message:"logged out successfully",
  });

});

//foget password
exports.forgotPassword = catchAsyncError(async(req,res,next)=>{
  const user = await User.findOne({email:req.body.email});
  if(!user){
    return next(new ErrorHander("user not found",404));
  }

  //get resetpassword token
  const resetToken = user.getResetPasswordToken();
  await user.save({validateBeforeSave:false});
  //creating link for forgot password
  
  const resetpasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

  const message = `your password reset token is: \n\n ${resetpasswordUrl} \n\n if you are not 
  requested this email then please ignore it`;

  try{
    await sendEmail({
      email:user.email,
      subject:`Dyanmic Bike System password Recovery`,
      message,

    });
    res.status(200).json({
      success:true,
      message:`Email sent to ${user.email} successfully`,
    });

  }catch(error){
    user.resetPasswordToken=undefined;
    user.resetPasswordExpire=undefined;
    await user.save({validateBeforeSave:false});


    return next(new ErrorHander(error.message,500));
  }

});
//to reset the password of the user
exports.resetPassword = catchAsyncError(async(req,res,next)=>{
  //creating token hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: {$gt:Date.now()},//gt means greater than
    });

    if(!user){
      return next(new ErrorHander("Reset Password Token is invalid or has been expired",400));
    }

    if(req.body.password !== req.body.confirmPassword){
      return next(new ErrorHander("Password doesnot match",400));

    }
    user.password = req.body.password;
    user.resetPasswordToken=undefined;
    user.resetPasswordExpire=undefined;

    user.save();
    sendToken(user,200,res);

});
//get user details which is loggin in the website
exports.getUsersDetails = catchAsyncError(async(req,res,next)=>{
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success:true,
    user,
  });
});

//update user password which is loggin in the website
exports.updatePassword = catchAsyncError(async(req,res,next)=>{
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
  if(!isPasswordMatched){
    return next(new ErrorHander("Old password is incorrect",400));
  }
  if(req.body.newPassword !== req.body.confirmPassword){
    return next(new ErrorHander("password doesnot match",400));
  }
  user.password = req.body.newPassword;
  await user.save();
  sendToken(user, 200, res);
  
});

//update user profile which is loggin in the website
exports.updateProfile = catchAsyncError(async(req,res,next)=>{
  const newUserData ={
    name: req.body.name,
    email:req.body.email,
  };

  // adding cloudinary for image
  if(req.body.avatar !== ""){
    const user = await User.findById(req.user.id);
    const imageId= user.avatar.public_id;

    await cloudinary.v2.uploader.destroy(imageId);
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar,{
      folder: "avatars",
      width:150,
      crop:"scale",
    });
    newUserData.avatar ={
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    }
  }


  const user = await User.findByIdAndUpdate(req.user.id, newUserData,{
    new:true,
    runValidators:true,
    useFindAndModify:false,
  });
 
  res.status(200).json({
    success:true,
  });
  
});

//getting all user details by admin
exports.getAllUser = catchAsyncError(async(req,res,next)=>{
  const users = await User.find(req.params.id);


  res.status(200).json({
    success:true,
    users,
  });
  
});

//getting single user details by admin
exports.getSingleUser = catchAsyncError(async(req,res,next)=>{
  const user = await User.findById(req.params.id);


  if(!user){
    return next(new ErrorHander(`User doesnot exit with id:${req.params.id}`));
  }
  res.status(200).json({
    success:true,
    user,
  });
  
});
//update user role--admin which is loggin in the website
exports.updateuserRole = catchAsyncError(async(req,res,next)=>{
  const newUserData ={
    name: req.body.name,
    email:req.body.email,
    role:req.body.role,
  };
  
   const user = await User.findByIdAndUpdate(req.params.id, newUserData,{
    new:true,
    runValidators:true,
    useFindAndModify:false,
  });
  
 
  res.status(200).json({
    success:true,
  });
  
});

//delete user by admin which is loggin in the website
exports.deleteUsers = catchAsyncError(async(req,res,next)=>{
  const user = await  User.findById(req.params.id);

  if(!user){
    return next(new ErrorHander(`User doesnot exist with this id:${req.params.id}`));

  }
  const imageId = user.avatar.public_id;
  await cloudinary.v2.uploader.destroy(imageId);
  //call remove method
  await user.remove()
 
  res.status(200).json({
    success:true,
    message:"user deleted successfully"
  });
  
});





