import React,{Fragment} from 'react'
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
const ProtectedRoute=({isAdmin, component:Component, ...rest})=> {
    const {loading, user} = useSelector((state)=> state.user);
    const checkLogin=window.localStorage.getItem("logged")
    return (
        <Fragment>
            {loading ===false  && (
                <Route
                {...rest}
                render={(props)=>{
        const token = window.localStorage.getItem("userInfo");

                    if(token){
                        return <Component {...props} />

                    }
                    if(isAdmin === true && user.role !== "admin"){
                        return <Redirect to="/login"/>;

                    }
                    return <Component{...props}/>
                }}
                />
            )}

        </Fragment>
        
    );
}

export default ProtectedRoute
