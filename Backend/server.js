//to import the app.js in server folder
const app = require("./app");

//Dotenv helps to find out the value of process.env.PORT 
const dotenv = require("dotenv");
const cloudinary = require("cloudinary");
//to import the connection of database
const connectDatabase = require("./config/database")
const path=require('path');
 __dirname=path.resolve();
//to handle uncaught execption
process.on("uncaughtException",(err)=>{
    console.log(`Error:${err.message}`);
    console.log(`shutting down the server due to uncaught execption`);
    process.exit(1);

})


if (process.env.NODE_ENV!=="production"){
    dotenv.config();
}
//connecting to database after configuring 
connectDatabase()


//using cloudinary
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})


//to make server by using listen
const server=app.listen(process.env.PORT,()=>{
    console.log(`server is running on https://localhost:${process.env.PORT}`)
});

//to unhandled promise rejection
process.on("unhandledRejection",(err)=>{
    console.log(`Error:${err.message}`);
    console.log(`shutting down the server due to unhanldle promise Rejection`);
    server.close(()=>{
        process.exit(1)

    })
    
}) ;