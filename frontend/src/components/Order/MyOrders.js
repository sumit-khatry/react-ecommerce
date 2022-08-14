import React,{Fragment, useEffect} from "react";
import {DataGrid} from "@material-ui/data-grid";
import "./MyOrders.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, myOrders } from "../../actions/orderAction";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Typography } from "@material-ui/core";
import LaunchIcon from "@material-ui/icons/Launch";
import Loading from "../LoadingError/Loading";
import MetaData from "../LoadingError/MetaData";

import Header from "../Header"


const MyOrders = () => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const {loading, error, orders} =useSelector((state)=>state.myOrders);
    const {user}= useSelector((state)=>state.user);
    

    const columns= [
        {field:"id", headerName:"Order ID", minWidth:90, flex:1},
        {
            field:"status",
            headerName:"Status",
            minWidth:90,
            flex:0.5,
            cellClassName:(params)=>{
                return params.getValue(params.id, "status")==="Delivered"
                ? "greenColor":"redColor";
            },
        },
        {
            field:"itemsQty",
            headerName:"Items Qty",
            type:"number",
            minWidth:90,
            flex:0.3,
        },
        {
            field:"amount",
            headerName:"Amount",
            type:"number",
            minWidth:100,
            flex:0.5,
        },
        {
            field:"actions",
            headerName:"Actions",
            minWidth:10,
            flex:0.3,
            type:"number",
            sortable:false,
            renderCell:(params)=>{
                return(
                    <Link to={`/order/${params.getValue(params.id, "id")}`}>
                        <LaunchIcon/>
                    </Link>
                );
            },
        },

    ];
    const rows =[];
    orders &&
    orders.forEach((item, index)=>{
        rows.push({
            itemsQty: item.orderItems.length,
            id:item._id,
            status:item.orderStatus,
            amount:item.totalPrice,
        });
    });

    //applying useEffect
    useEffect(() => {
       if(error){
           alert.error(error);
           dispatch(clearErrors());
       }
       dispatch(myOrders());
    }, [dispatch, alert, error]);

    return (
        <Fragment>
            <MetaData title={`${user.name}- Orders`}/>
            {loading ?(
                <Loading />
            ):(<div>
                <div className="myOrdersPage">
                    <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    disableSelectionOnClick
                    className="myOrdersTable"
                    autoHeight
                    />
                    <Typography id="myOrdersHeading">{user.name}'s Orders</Typography>

                </div>
                </div>

            )}
        </Fragment>
        
    );
};

export default MyOrders;
