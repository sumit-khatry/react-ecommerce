import React, { Fragment, useEffect , useState} from 'react'
import "./ProductDetails.css";
import Loading from "../LoadingError/Loading"
import {useSelector, useDispatch} from "react-redux";
import {clearErrors, getProductDetails, newReview} from "../../actions/productAction";
import ReviewCard from "./ReviewCard.js";
import {useAlert} from "react-alert";
import MetaData from "../LoadingError/MetaData"
import { addItemsToCart } from '../../actions/cartAction'; 
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button
} from "@material-ui/core";
import {Rating} from "@material-ui/lab";
import { NEW_REVIEW_RESET } from '../../constants/productConstants';
const ProductDetails = ({match} )=> {
    
    
    const dispatch = useDispatch();
    const alert = useAlert();
    // pulling the data from the redux through selector
    const {product, loading, error} = useSelector(
        (state) => state.productDetails
    );

    const {success, error:reviewError} = useSelector((state)=>state.newReview);
    

    const options ={
   
       
        value: product.ratings,
        readOnly: true,
        precision: 0.5,
   


    };
    //using state

    const [quantity, setQuantity] = useState(1);
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
//for increasing and decreasing products itmes
    const increaseQuantity= ()=>{
        if(product.Stock <= quantity) return;
        const qty = quantity +1;
        setQuantity(qty);


    };
    const decreaseQuantity= ()=>{
        if(1 >= quantity) return;
        const qty = quantity -1;
        setQuantity(qty);


    };
    //making add items handler
    const addToCartHandler= ()=>{
        dispatch(addItemsToCart(match.params.id, quantity));
        alert.success("Product Successfully added to cart");
    };

    //making submitReviewTogge
    const submitReviewToggle=()=>{
        open ? setOpen(false) :setOpen(true);

    }
    //for submit button, making handler

    const reviewSubmitHandler=()=>{
        const myForm = new FormData();
        myForm.set("rating", rating);
        myForm.set("comment", comment);
        myForm.set("productId", match.params.id);

        dispatch(newReview(myForm));
        setOpen(false);
    };
    useEffect(() => {
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
        if(reviewError){
            alert.error(reviewError);
            dispatch(clearErrors());
        }
        if(success){
            alert.success("Feedback Submiited sucessfully");            // alert.success("Feedback Submitted Succesfully");
            dispatch({type:NEW_REVIEW_RESET})
        }
        dispatch(getProductDetails(match.params.id));    
    }, [dispatch,match.params.id, alert, error, reviewError, success]);


    return(
    
    <Fragment>
        {loading?(<Loading/>
        ):(
        <Fragment>
                   <MetaData title={`${product.name} --  Dyanmic Bikes Ecommerce`}/>
            <div className="ProductDetails">
                <div>
                   
                        {
                            product.images && product.images.map((item, i) =>(
                            <img
                                className="CarouselImage"
                                key={item.url}
                                src={item.url}
                                alt={`${i} Slide`}
                            />
                        ))}
                </div>

                <div>
                    <div className="detailsBlock-1">
                        <h2>{product.name}</h2>
                        <p>Product #{product._id}</p>
                    </div>
                    <div className="detailsBlock-2">
                        <Rating {...options}/>
                        <span className='detailsBlock-2-span'>({product.numOfReviews} Reviews)</span>

                    </div>
                    <div className="detailsBlock-3">
                        <h1>{`₹${product.price}`}</h1>
                        <div className="detailsBlock-3-1">
                            <div className="detailsBlock-3-1-1">
                                <button onClick={decreaseQuantity}>-</button>
                                <input readOnly value={quantity} type="number"/>
                                <button onClick={increaseQuantity}>+</button>

                            </div>
                            <button disabled={product.Stock<1 ? true:false} onClick={addToCartHandler}>Add to Cart</button>

                        </div>
                        <p>
                            Status:{""}
                            <b className={product.Stock <1? "redColor": "greenColor"}>
                                {product.Stock <1? "OutOfStock" :"InStock"}
                            </b>
                        </p>
                    </div>
                    <div className="detailsBlock-4">
                        Description:<p>{product.description}</p>
                    </div>
                    <button onClick={submitReviewToggle} className="submitReview">Submit Review</button>
                </div>

            </div>
           
           
            <h3 className="reviewsHeading">FEEDBACKS</h3>
            <Dialog
            aria-labelledby='simple-dialog-title'
            open={open}
            onClose={submitReviewToggle}
            >
                <DialogTitle>Submit Review</DialogTitle>
                <DialogContent className="submitDialog">
                    <Rating
                    onChange={(e)=>setRating(e.target.value)}
                    value={rating}
                    size="large"
                    />
                    <textarea

                    className="submitDialogTextArea"
                    cols="30"
                    rows="5"
                    value={comment}
                    onChange={(e)=> setComment(e.target.value)}
                    >
                    </textarea>

                </DialogContent>
                <DialogActions>
                    <Button onClick={submitReviewToggle} color="secondary">Cancle</Button>
                    <Button onClick={reviewSubmitHandler}>Submit</Button>

                </DialogActions>

            </Dialog>

            {product.reviews && product.reviews[0]?(
                <div className="reviews">
                    {product.reviews && product.reviews.map((review)=><ReviewCard review={review}/> 
                    )}
                </div>
            ):(
                <p className="noReviews">No Reviews Yet</p>
            )}
        
            
        </Fragment>

        )}
    </Fragment>
    );   
    
};

export default ProductDetails;
