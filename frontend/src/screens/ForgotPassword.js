import React, { Fragment, useState, useEffect } from "react"
import "./ForgotPassword.css";
import Loading from "../components/LoadingError/Error";
import {useDispatch, useSelector} from "react-redux";
import{clearErrors,  forgotPassword} from "../actions/userAction";
import {useAlert} from "react-alert"
import MetaData from "../components/LoadingError/MetaData";
import MailOutlineIcone from "@material-ui/icons/MailOutline";



const ForgotPassword = () => {
    const dispatch = useDispatch();
    const alert= useAlert();

    //pulling error by using useselector
 
    const{ error, message, loading} = useSelector((state)=> state.forgotPassword);
    const [email, setEmail] = useState("");

     // submit handler
     const forgotPasswordSubmit=(e)=>{
        e.preventDefault();

        const myForm = new FormData();
        myForm.set("email", email);
        
        dispatch(forgotPassword(myForm));
    };

    //applying use effect
    useEffect(() => {

      
        if(error){
            alert.error(error);
            dispatch(clearErrors());

        }
        //when alert is success than user get the message
        if(message){
            alert.success(message);
        }      
        
    }, [dispatch, error, alert, message]);
    return (
        <Fragment>
            {loading?(<Loading/>
            ):(
                <Fragment>
                <MetaData title="Forgot Password"/>
                <div className='forgotPasswordContainer'>
                    <div className='forgotPasswordBox'>
                        <h2 className="forgotPasswordHeading">ForgotPassword</h2>
                        <form 
                            className='forgotPasswordForm'
                             
                            onSubmit={forgotPasswordSubmit}
    
                            >
                                {/* for mail div */}
                                <div className="forgotProfileEmail">
                                <MailOutlineIcone/>
                                <input
                                    type="email"
                                    placeholder='Email'
                                    required
                                    name="email"
                                    value={email}
                                    onChange={(e)=>setEmail(e.target.value)}
                                />
    
                            </div>
                            
                            
                            
                             {/* for submit button */}
                            <input
                                type="submit"
                                value="Send"
                                className='forgotPasswordBtn'
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

export default ForgotPassword
