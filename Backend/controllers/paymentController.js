const catchAsyncError = require("../middleware/catchAsyncError");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.processPayment = catchAsyncError(async(req, res, next)=>{
    const myPayment = await stripe.paymentIntents.create({
        amount:req.body.amount,
        currency:"inr",
        metadata:{
            company:"Dynamic Bike Ecomemrce",
        },

    });
    res
    .status(200)
    .json({success:true, client_secret: myPayment.client_secret});
});
//for STRIPE_API_KEY 
exports.sendStripeApiKey= catchAsyncError(async(req, res, next)=>{
    res.status(200).json({stripeApiKey: process.env.STRIPE_API_KEY});
});