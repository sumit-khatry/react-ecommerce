const mongoose = require("mongoose");
const validator = require("validator");
const productSchema= mongoose.Schema({
    //curly backet is used for taking the object
    name:{
        type:String,
        required:true,
       
        required:[true,"Please Enter product Name"]
       
    },
    description:{
        type:String,
        
        required:[true,"Please Enter product Description"]

    },
    price:{
        type:Number,
        
        required:[true,"Please Enter product Price"],
        maxLength:[8,"Prie cannot exceed 8 characters"]
    },
    ratings:{
        type:Number,
        default:0
    },
    images:[
        {
            //while uploading the pictures then it required the public id and url
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
        }

    ],
    category:{
        type:String,
        default:'Bikes parts'     
        // required:[true,"Please Enter product category"]


    },
    Stock:{
        type:Number,
        required:[true,"Please ENter product Stock"],
        maxlength:[4,"stock cannot exceed 4 characters"],
        default:1
    },
    numOfReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
            user:{
                type:mongoose.Schema.ObjectId,
                ref:"User",
                required:true,
        
            },
            name:{
                type:String,
                required:true,

            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:String,
                required:true
            }
        }
    ],
    //This helps to seperate the admin name by id 
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true,

    },
    createdAt:{
        type:Date,
        default:Date.now
    }



    
})

//exporting the model and passing the schema
// const Product = new  mongoose.model("Product",productSchema);
// module.exports= Product;
module.exports= mongoose.model("Product",productSchema);