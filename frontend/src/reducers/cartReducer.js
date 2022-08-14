import { ADD_TO_CART, REMOVE_CART_ITEM, SAVE_SHIPPING_INFO } from "../constants/cartConstants";



export const cartReducer = (state ={cartItems:[], shippingInfo:{}}, action)=>{

    //using switch method
    switch (action.type) {
        case ADD_TO_CART:
            const item = action.payload;
            const isItemExist = state.cartItems.find(
                (i) => i.product === item.product
            );
            if(isItemExist){
                return{
                    ...state,
                    cartItems: state.cartItems.map((i)=>
                    i.product === isItemExist.product ? item:i),
                };

            }else{
                return{
                    ...state,
                    cartItems:[...state.cartItems, item],
                }
            }
        // FOR REMOVING ITEMS FROM CART
        case REMOVE_CART_ITEM:
            return{
                ...state,
                cartItems: state.cartItems.filter((i)=> i.product !== action.payload),
            }
        //FOR SHIPPING INFO DETAILS
        case SAVE_SHIPPING_INFO:
            return{
                ...state,
                shippingInfo: action.payload,
            }
        
            
         
    
        default:
            return state;
    };

};