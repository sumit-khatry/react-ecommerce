import React, { Fragment, useState, useEffect } from "react"
import "./UpdatePassword.css";
import Loading from "../components/LoadingError/Loading";
import {useDispatch, useSelector} from "react-redux";
import{clearErrors,  updatePassword} from "../actions/userAction";
import {useAlert} from "react-alert"
import { UPDATE_PASSWORD_RESET } from '../constants/userConstants';
import MetaData from "../components/LoadingError/MetaData";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import VpnKeyIcon from "@material-ui/icons/VpnKey";

const UpdatePassword = ({history}) => {
    const dispatch = useDispatch();
    const alert= useAlert();

    //pulling error by using useselector
 
    const{ error, isUpdated, loading} = useSelector((state)=> state.profile);
    
    const [oldPassword, setOldPassword]= useState("");
    const [newPassword, setNewPassword]= useState("");
    const [confirmPassword, setConfirmPassword]= useState("");
    // submit handler
    const updatePasswordSubmit=(e)=>{
        e.preventDefault();

        const myForm = new FormData();
        myForm.set("oldPassword", oldPassword);
        myForm.set("newPassword", newPassword);
        myForm.set("confirmPassword", confirmPassword);
        dispatch(updatePassword(myForm));
    };

    //applying use effect
    useEffect(() => {
        
      
        if(error){
            alert.error(error);
            dispatch(clearErrors());

        }
        //if the user authentication is true then it clear the form for user
        if(isUpdated){
            alert.success("Password updated successfully");
            history.push("/account")
            dispatch({
                type:UPDATE_PASSWORD_RESET,

            });
        }
            
        
    }, [dispatch, error, alert, history, isUpdated]);
    return (
        <Fragment>
            {loading?(<Loading/>
            ):(
                <Fragment>
                <MetaData title="Update Password"/>
                <div className='updatePasswordContainer'>
                    <div className='updatePasswordBox'>
                        <h2 className="updatePasswordHeading">UpdatePassword</h2>
                        <form 
                            className='updatePasswordForm'
                             
                            onSubmit={updatePasswordSubmit}
    
                            >
                            {/* for password */}
                            <div className='loginPassword'>
                                <VpnKeyIcon/>
                                <input
                                type="password"
                                placeholder=' Old Password' required
                                value={oldPassword}
                                onChange={(e)=> setOldPassword(e.target.value)}
                                />

                            </div>
                            {/* for password */}
                            <div className='loginPassword'>
                                <LockOpenIcon/>
                                <input
                                type="password"
                                placeholder=' New Password' required
                                value={newPassword}
                                onChange={(e)=> setNewPassword(e.target.value)}
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
                                value="Change"
                                className='updatePasswordBtn'
                                    // disabled={loading ? true:false}
                            />
    
                        </form>
    
                    </div>
                </div>
                </Fragment>

            )}
        </Fragment>
    );
};

export default UpdatePassword;
