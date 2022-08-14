//importing the product
const Product = require("../models/productModel.js");
const ErrorHander = require("../utils/errorhander.js");
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apifeatures.js");
const cloudinary = require("cloudinary");




//create product by admin
exports.createProduct = catchAsyncError(async(req,res,next)=>{

    // res.status(201).json({
    //     success:true,
    //     message:"post is working fine"})
  req.body.user= req.user.id; //this helps to find out the admin Id
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });

    imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
  req.body.user = req.user.id;
    
  const product = await Product.create(req.body);
  res.status(201).json({
    success:true,
    product
  });    
});

//to get all products
exports.getAllProducts =catchAsyncError( async (req,res, next)=>{
  //return next(new ErrorHander("this is my temp",500));
    //for pagination
    const resultperpage = 8;
    const productsCount = await Product.countDocuments();
    //calling apifeatures class and calling search function
    const apifeatures= new ApiFeatures(Product.find(),req.query)
    .search()
    .filter()
   let products = await apifeatures.query;
   let filteredProductsCount = products.length;
   apifeatures .pagination(resultperpage);

   
    products = await apifeatures.query.clone();//apifeatures call all the method is one query
    res.status(200).json({
        success:true,
        products,
        productsCount,
        resultperpage,
        filteredProductsCount
        
    });

    
   
   //res.status(200).json({message:"route is working fine"}) ///json send the message

});
//to get all products by (admin)
exports.getAdminProducts =catchAsyncError( async (req,res, next)=>{
  
    const products= await Product.find();
    res.status(200).json({
        success:true,
        products,
       
        
    });

    
   
   //res.status(200).json({message:"route is working fine"}) ///json send the message

});
//get single products details
exports.getProductDetails =catchAsyncError( async(req,res,next)=>{
  
    const product = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHander("product not found",404));//next is call back function and errorhander is the object it require message and status code.
            
    }
        
    res.status(200).json({
        success:true,
        product,
        //productCount
        //message:"product is all"
    })


    
    
});
//to update the products--admin
exports.updateProduct =catchAsyncError(async(req,res,next)=>{
  let product = await Product.findById(req.params.id);
  if(!product){

    return res.status(500).json({
      success:false,
      message:"product not found"
    })
        
  }
  // Images Start Here
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    // Deleting Images From Cloudinary
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }

  product =await Product.findByIdAndUpdate(req.params.id,req.body,{
    new:true, 
    runValidators:true,
    useFindAndModify:false
  });
  res.status(200).json({
    success:true,
    product

  })
});
//delete of product
exports.deleteProduct = catchAsyncError(async(req,res,next)=>{
  const product = await Product.findById(req.params.id);
  if(!product){
    return next(new ErrorHander("product not found",404));//next is call back function and errorhander is the object it require message and status code.
        
  }
  // Deleting Images From Cloudinary
  for (let i = 0; i < product.images.length; i++) {
    await cloudinary.v2.uploader.destroy(product.images[i].public_id);
  }
    // if(!product){
    //     return res.status(500).json({
    //         success:false,
    //         message:"product not found"
    //     })
    // }
  await product.remove();
  res.status(200).json({
    success:true,
    message:"product delete successfully"
  })
});
//Create New reviews o update the review 
exports.createProductReview = catchAsyncError(async(req,res,next)=>{
  const{rating, comment, productId} = req.body;

  const review ={
    user:req.user._id,
    name: req.user.name,
    rating:Number(rating),
    comment,
  };
  const product = await Product.findById(productId);

    //it check the usedid of review and your already exist userId if both math then user 
    //already had given the review on the product if not then not 
  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });

  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }
    //calculating average of rating 
  let avg=0;
  product.reviews.forEach((rev)=>{
    avg+=rev.rating //avg=avg+rev.rating means adding into avg
  })
  product.ratings = avg/product.reviews.length;
  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success:true,
  });


});

// Get All Reviews of a product
exports.getProductReviews = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.id);
  
  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }
  
  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});
// Delete Review
exports.deleteReview = catchAsyncError(async (req, res, next) => {
    //to find the product
  const product = await Product.findById(req.query.productId);
  //if product doesnot found then
  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }
  //_id is those id which created while giving reviews
  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );
  
  let avg = 0;
  
  reviews.forEach((rev) => {
    avg += rev.rating;
  });
  
  let ratings = 0;
  
  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }
  
  const numOfReviews = reviews.length;
  
  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );
  
  res.status(200).json({
    success: true,
  });
});
    