import { ADD_TO_CART, REMOVE_CART_ITEM, SAVE_SHIPPING_INFO } from "../constants/cartConstants";
import axios from "axios";

//add the items in the cart
export const addItemsToCart=(id, quantity)=> async (dispatch, getState)=>{

        

        const {data} = await axios.get(`/api/v1/product/${id}`);

        dispatch({
            type:ADD_TO_CART,
            payload:{
                product: data.product._id,
                name:data.product.name,
                price:data.product.price,
                image: data.product.images[0].url,
                stock: data.product.Stock,
                quantity,
            },
        });
    //when doesnot remove the items from the cart then the items remain in the cart page
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
    
};
//Remove the product items form the carts
export const removeItemsFromCart = (id) => async(dispatch, getState)=>{
    dispatch({
        type: REMOVE_CART_ITEM,
        payload:id,
    });
    
     //when doesnot remove the items from the cart then the items remain in the cart page
     localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));

};
//saving shipping info of the users
export const saveShippingInfo = (data) => async(dispatch)=>{
    dispatch({
        type: SAVE_SHIPPING_INFO,
        payload:data,
    });
    localStorage.setItem("shippingInfo", JSON.stringify(data));
};