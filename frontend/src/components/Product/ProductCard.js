import React,{Fragment, useEffect, useState} from 'react';
import "./Products.css";
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getProduct } from '../../actions/productAction';
import ProductCard from "../homeComponents/ProductCard"
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import Typography  from '@material-ui/core/Typography';
import Loading from "../LoadingError/Loading";
// import { useAlert } from 'react-alert';
// import MetaData from '../layout/MetaData';


const Products = ({match}) => {
    const dispatch= useDispatch();

    const [currentPage, setCurrentPage] = useState(1)
    // for priceHandler
    const[price, setPrice]= useState([0, 25000]);
    //for categories
    const[category, setCategory] = useState("");
    const[ratings, setRatings] = useState(0);
    // const alert = useAlert();



    const {products, loading, error, productsCount,resultperpage} = useSelector(state => state.products);
    const keyword= match.params.keyword;

    //making setCurrentPage
    const setCurrentPageNo =(e)=>{
        setCurrentPage(e)
    };
    //making for priceHandler
    const priceHandler = (event, newPrice) =>{
        setPrice(newPrice);
    }

useEffect(() => {
    if(error){
        // alert.error(error);
        dispatch(clearErrors());
    }
    dispatch (getProduct(keyword,currentPage,price,category,ratings));
   
    
}, [dispatch, keyword, currentPage,price,ratings, alert, error]); //adding all the dependencies
    return (
        <Fragment>
            {loading ? <Loading/>:
            <Fragment>
                <MetaData title="PRODUCTS ---Dynamic Bike Parts"/>
                <h2 className="productsHeading">Products</h2>
                <div className="products">
                    {products && products.map((product)=>(
                        <ProductCard key={product._id} product={product}/>

                    ))}
                    
                </div>
                {/* adding all the filters */}
                <div className="filterBox">
                    <Typography>Price</Typography>
                    <Slider 
                    value={price}
                    onChange={priceHandler}
                    valueLabelDisplay='auto'
                    aria-labelledby='range-slider'
                    min={0}
                    max={25000}
                    />
                    {/* for category filter */}
                    <Typography>Categories</Typography>
                   
                    {/* for rating filter */}
                    <fieldset>
                    <Typography component= "legend">Rating Above</Typography>
                    <Slider
                        value={ratings}
                        onChange={(e, newRating)=>{
                            setRatings(newRating);
                        }}
                        aria-labelledby =" continuous-slider"
                        min={0}
                        max={5}
                        valueLabelDisplay='auto'

                    />

                    </fieldset>

                </div>
              

                
            </Fragment>
                
        }</Fragment>

    );
}
export default Products;
