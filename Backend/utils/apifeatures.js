class ApiFeatures{
    constructor(query,queryStr){//making one costruction and  passing parameter
        this.query=query;//this is the property of same class
        this.queryStr=queryStr;
    }
    //for search function
    search(){
        const keyword = this.queryStr.keyword
        ?{
            name:{
                $regex:this.queryStr.keyword,// regex is mongodb operator and regular expression
                $options:"i",//case insensitive
            },

         }
        :{};
        console.log(keyword);
        this.query = this.query.find({ ...keyword });//passing the keyword which is made my using regex
        return this;
    }
    //for filter
    filter(){
        const queryCopy = {...this.queryStr};
        //console.log(queryCopy);
        //removing some fields for category
        const removefields =["keyword","page","limit"];

        removefields.forEach((key) => delete queryCopy[key]);
        //console.log(queryCopy);
        //filter for price and rating
        console.log(queryCopy);
        let queryStr = JSON.stringify(queryCopy);//to convert into string
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g,key=>`$${key}`);


        this.query = this.query.find(JSON.parse(queryStr));
        console.log(queryStr);
        return this;

    }
    //for pagination and convert the string value in number
    pagination(resultperpage){
        const currentPage = Number(this.queryStr.page) ||1; //if the user don't give the page than default value is 1

        const skip= resultperpage *(currentPage -1);
        //limit show the total page and skip help to skip the current page.
        this.query = this.query.limit(resultperpage).skip(skip);
        return this;

    }
    
}

//to export 
module.exports= ApiFeatures;