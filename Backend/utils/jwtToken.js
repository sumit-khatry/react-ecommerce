//creating function for token and saving in cookies
const sendToken=(user,statusCode, res)=>{
    const token = user.getJWTToken();
    
    //option for cookies to get expires,when user give 7 days then cookies expires after 7 days
    const options ={
        expires:new Date(
            Date.now()+process.env.COOKIE_EXPIRE  *24*60*60*1000 //TO converting into milisecond value

        ),
        httpOnly:true,
    };
    res.status(statusCode).cookie("token",token,options).json({
        success:true,
        user,
        token,
    });
};

module.exports= sendToken;