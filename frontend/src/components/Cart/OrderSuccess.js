import React from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import "./OrderSuccess.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import MetaData from "../LoadingError/MetaData";

const OrderSuccess = () => {
    return (
        <div className="orderSuccess">
            <MetaData title="order sucess" />
            <CheckCircleIcon/>
            <Typography>Your Order has been Placed Sucsessfully</Typography>
            <Link to="/orders">View Orders</Link>

        </div>
       
    )
}

export default OrderSuccess
