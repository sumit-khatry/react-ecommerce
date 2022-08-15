import React  from "react";
import "./App.css";
import "./responsive.css";
import "react-toastify/dist/ReactToastify.css";
import {useSelector} from "react-redux"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import Dashboard from "./components/Admin/Dashboard";
import Products from "./components/Product/Products"
import ProductDetails from "./components/Product/ProductDetails"
import UpdateUser from "./components/Admin/UpdateUser"
import Login from "./screens/Login";
import Register from "./screens/Register";
import ProtectedRoute from "./ProtectedRoute";
import Payment from "./components/Cart/Payment"
import UpdateProduct from "./components/Admin/UpdateProduct"
import UserOptions from "./components/userOptions/UserOptions"
import Header from "./components/Header";
import UpdatePassword from "./screens/UpdatePassword"
import UpdateProfile from "./screens/UpdateProfile";

import Cart from "./components/Cart/Cart";
import Shipping from "./components/Cart/Shipping";
import ConfirmOrder from "./components/Cart/ConfirmOrder";
import OrderSuccess from "./components/Cart/OrderSuccess";
import OrderList from "./components/Admin/OrderList"
import UsersList from "./components/Admin/UsersList"
import ProductReview from "./components/Admin/ProductReviews"
import ProductList from "./components/Admin/ProductList";
import Profile from "./screens/Profile";
import MyOrders from "./components/Order/MyOrders";
import OrderDetails from "./components/Order/OrderDetails"
import NewProduct from "./components/Admin/NewProduct";
import ProcessOrder from "./components/Admin/ProcessOrder"
import ForgotPassword from "./screens/ForgotPassword"
import NotFound from "./screens/NotFound";



const App = () => {
  const {isAuthenticated, user}= useSelector((state)=> state.user);
  
  
  
  return (
    
    <Router>
      
      <Header />
      {isAuthenticated && <UserOptions user={data}/>}

      <Switch>

        <Route path="/" component={HomeScreen} exact />
        <Route path="/products/:keyword" component={HomeScreen} exact />
        <Route path="/page/:pagenumber" component={HomeScreen} exact />
        <Route
          path="/search/:keyword/page/:pageNumber"
          component={HomeScreen}
          exact
        />
          <Route exact path="/password/forgot" component={ForgotPassword}/>

          <ProtectedRoute exact path="/success" component={OrderSuccess}/>
          <Route exact path="/product/:id" component={ProductDetails}/>
          <Route exact path="/products" component={Products}/>

          


          <Route exact path="/cart" component={Cart}/>
          <ProtectedRoute exact path="/me/update" component={UpdateProfile}/>



        {/* <Route path="/products/:id" component={SingleProduct} /> */}
        <ProtectedRoute exact path="/password/update" component={UpdatePassword}/>

        <Route path="/login" component={Login} />
        <ProtectedRoute isAdmin={true} exact path="/admin/product/:id" component={UpdateProduct}/>

        <ProtectedRoute exact path="/shipping" component={Shipping}/>
        <ProtectedRoute isAdmin={true} exact path="/admin/dashboard" component={Dashboard}/>
        <ProtectedRoute isAdmin={true} exact path="/admin/orders" component={OrderList}/>
        <ProtectedRoute isAdmin={true} exact path="/admin/users" component={UsersList}/>
        <ProtectedRoute isAdmin={true} exact path="/admin/reviews" component={ProductReview}/>
        <ProtectedRoute isAdmin={true} exact path="/admin/products" component={ProductList}/>
        <ProtectedRoute isAdmin={true} exact path="/admin/user/:id" component={UpdateUser}/>



        <ProtectedRoute isAdmin={true} exact path="/admin/product" component={NewProduct}/>





        
        <Route path="/register" component={Register} />
        <ProtectedRoute path="/account" component={Profile} />
        <ProtectedRoute path="/orders" component={MyOrders} />
        <ProtectedRoute exact path="/order/confirm" component={ConfirmOrder}/>
        <ProtectedRoute exact path="/process/payment" component={Payment}/>
        <ProtectedRoute isAdmin={true} exact path="/admin/order/:id" component={ProcessOrder}/>



        <ProtectedRoute exact path="/order/:id" component={OrderDetails}/>

        {/* <PrivateRouter path="/profile" component={ProfileScreen} /> */}
        {/* <Route path="/cart/:id?" component={CartScreen} /> */}
        {/* <PrivateRouter path="/shipping" component={ShippingScreen} /> */}
        {/* <PrivateRouter path="/payment" component={PaymentScreen} /> */}
        {/* <PrivateRouter path="/placeorder" component={PlaceOrderScreen} /> */}
        {/* <PrivateRouter path="/order/:id" component={OrderScreen} /> */}
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
};

export default App;
