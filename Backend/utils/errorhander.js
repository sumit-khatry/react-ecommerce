class ErrorHander extends Error{//inheretance the default class of node(error)
    construction (message,statusCode){
        Super(message);
        this.statusCode = statusCode
        Error.captureStackTrace(this,this.construction);//using the method of construction class 
    }
    
}
module.exports=ErrorHander