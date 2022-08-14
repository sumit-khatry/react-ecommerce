import React, { Fragment, useState, useEffect } from "react"
import "./ResetPassword.css";
import Loader from "../layout/Loader/Loader";
import {useDispatch, useSelector} from "react-redux";
import{clearErrors,  resetPassword} from "../../actions/userAction";
import {useAlert} from "react-alert"
import MetaData from "../layout/MetaData"; 
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";


const ResetPassword = ({history, match}) => {
    const dispatch = useDispatch();
    const alert= useAlert();

    //pulling error by using useselector
 
    const{ error, success, loading} = useSelector((state)=> state.forgotPassword);
    
    const [password, setPassword]= useState("");
    const [confirmPassword, setConfirmPassword]= useState("");
    // submit handler
    const resetPasswordSubmit=(e)=>{
        e.preventDefault();

        const myForm = new FormData();
        myForm.set("password", password);
        myForm.set("confirmPassword", confirmPassword);
        dispatch(resetPassword(match.params.token, myForm));
    };

    //applying use effect
    useEffect(() => {
        
      
        if(error){
            alert.error(error);
            dispatch(clearErrors());

        }
        //if the user authentication is true then it clear the form for user
        if(success){
            alert.success("Password updated successfully");
            history.push("/login")
       
            
        }
            
        
    }, [dispatch, error, alert, history, success]);
    return (
        <Fragment>
            {loading?(<Loader/>
            ):(
                <Fragment>
                <MetaData title="Reset Password"/>
                <div className='resetPasswordContainer'>
                    <div className='resetPasswordBox'>
                        <h2 className="resetPasswordHeading">resetPassword</h2>
                        <form 
                            className='resetPasswordForm'
                             
                            onSubmit={resetPasswordSubmit}
    
                            >
                            
                            {/* for password */}
                            <div>
                                <LockOpenIcon/>
                                <input
                                type="password"
                                placeholder=' New Password' required
                                value={password}
                                onChange={(e)=> setPassword(e.target.value)}
                                />

                            </div>
                            {/* for password */}
                            <div className='loginPassword'>
                                <LockIcon/>
                                <input
                                type="password"
                                placeholder='Confirm Password' required
                                value={confirmPassword}
                                onChange={(e)=> setConfirmPassword(e.target.value)}
                                />

                            </div>

                            
                               
    
                            
                             {/* for submit button */}
                            <input
                                type="submit"
                                value="Update"
                                className='resetPasswordBtn'
                                    // disabled={loading ? true:false}
                            />
    
                        </form>
    
                    </div>
                </div>
                </Fragment>

            )}
        </Fragment>
    );
}

export default ResetPassword
