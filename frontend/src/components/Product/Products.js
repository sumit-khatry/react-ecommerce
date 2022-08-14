import React,{Fragment, useEffect, useState} from 'react';
import "./Products.css";
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getProduct } from '../../actions/productAction';
import ProductCard from "../homeComponents/ProductCard";
import Pagination from "react-js-pagination";
import { useAlert } from 'react-alert';
import MetaData from "../LoadingError/MetaData.js";

import Loading from "../LoadingError/Loading"

const Products = ({match}) => {
    const dispatch= useDispatch();

    const [currentPage, setCurrentPage] = useState(1)
    const[price, setPrice]= useState([0, 25000]);
    const[ratings, setRatings] = useState(0);
    const alert = useAlert();



    const {products, loading, error, productsCount,resultperpage,filteredProductsCount} = useSelector(state => state.products);
    const keyword= match.params.keyword;

    const setCurrentPageNo =(e)=>{
        setCurrentPage(e)
    };
    const priceHandler = (event, newPrice) =>{
        setPrice(newPrice);
    }

useEffect(() => {
    if(error){
        alert.error(error);
        dispatch(clearErrors());
    }
    dispatch (getProduct(keyword,currentPage,price,ratings));
   
    
}, [dispatch, keyword, currentPage,price,ratings, alert, error]); //adding all the dependencies
let count= filteredProductsCount;

    return (
        <Fragment>
            {loading ? <Loading/>:
            <Fragment>
                <MetaData title="PRODUCTS ---Dyanmic Bike Ecomemrce"/>
                <h2 className="productsHeading">Products</h2>
                <div className="products">
                    {products && products.map((product)=>(
                        <ProductCard key={product._id} product={product}/>

                    ))}
                    
                </div>
                                {/* making div for pagination of prodcuts and applying condition if the 
                total number of result is lesser then product counts then don't show the pagination button */}
                {resultperpage < count &&(
                    <div className='paginationBox'>
                        <Pagination
                        activePage={currentPage}
                        itemsCountPerPage={resultperpage}
                        totalItemsCount={productsCount}
                        onChange={setCurrentPageNo}
                        nextPageText="Next"
                        prevPageText="Prev"
                        firstPageText="1st"
                        lastPageText="Last"
                        itemClass='page-item'
                        linkClass='page-link'
                        activeClass='pageItemActive'
                        activeLinkClass='pageLinkActive'
                        />

                    </div>
                )} 

                
            </Fragment>
                
        }</Fragment>

    );
}
export default Products;
