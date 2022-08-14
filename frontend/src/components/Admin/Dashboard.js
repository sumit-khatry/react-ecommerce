import React,{ useEffect} from "react";
import Sidebar from "./Sidebar.js";
import "./dashboard.css";
import {Link} from "react-router-dom";
import {Typography} from "@material-ui/core";
import { Line} from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { getAdminProduct } from "../../actions/productAction.js";
import { getAllOrders } from "../../actions/orderAction.js";
import { getAllUsers } from "../../actions/userAction.js";
import MetaData from "../LoadingError/MetaData.js";


const Dashboard = () => {
    const dispatch = useDispatch();

    const {products} = useSelector((state)=> state.products);
    const {orders} = useSelector((state)=> state.allOrders);
    const { users} = useSelector((state)=> state.allUsers);

    let totalAmount = 0;
        orders &&
        orders.forEach((item) => {
        totalAmount += item.totalPrice;
    });
    const lineState = {
        labels: ["Initial Amount", "Amount Earned"],
            datasets: [
            {
                label: "TOTAL AMOUNT",
                backgroundColor: ["#1cb803"],
                hoverBackgroundColor: ["rgb(197, 72, 49)"],
                data: [0, totalAmount],
            },
        ],
    };
  

    useEffect (()=>{
        dispatch(getAdminProduct());
        dispatch(getAllOrders());
        dispatch(getAllUsers());
    }, [dispatch]);
    return (
        <div className="dashboard">
            <MetaData title="admin dashborad" />
            <Sidebar/>
            <div className="dashboardContainer">
                <Typography component="h1">DashBoard</Typography>
                <div className="dashboardSummary">
                    <div>
                        <p>
                            Total Amount 
                        </p>
                        <p>{totalAmount }</p>
                    </div>
                    <div className="dashboardSummaryBox2">
                        <Link to="/admin/products">
                            <p>Products</p>
                            <p>{products && products.length}</p>
                        </Link>
                        <Link to="/admin/orders">
                            <p>Orders</p>
                            <p>
                                {orders && orders.length}
                            </p>
                        </Link>
                        <Link to="/admin/users">
                            <p>Users</p>
                            <p>{users && users.length}</p>
                        </Link>

                    </div>

                </div>

                <div className="lineChart">
                    <Line
                    data={lineState}

                    />

                </div>
                {/* <div className="doughnutChart">
                    <Doughnut data={doughnutState}/>

                </div> */}

            </div>
            
        </div>
    );
};

export default Dashboard;



