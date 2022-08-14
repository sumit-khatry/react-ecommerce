import React, { Fragment, useRef, useState, useEffect } from 'react'
// import "./LoginSignUp.css";
// import Loader from '../layout/Loader/Loader';
import {Link} from "react-router-dom";
import Message from "../components/LoadingError/Error";
import Loading from "../components/LoadingError/Loading";


import {useDispatch, useSelector} from "react-redux";
import{clearErrors, login, register} from "../actions/userAction";
import {useAlert} from "react-alert"
function LoginSignUp({history, location}) {
    const dispatch = useDispatch();
    const alert= useAlert();

    //pulling error by using useselector
    const{error, loading, isAuthenticated} = useSelector(state => state.user);


    const [user, setUser]= useState({
        name:"",
        email:"",
        password:"",
    });

    //fetching the name, email, password form user
    const{name, email, password}= user;

    const[avatar, setAvatar]= useState();
    const[avatarPreview, setAvatarPreview]= useState("/Profile.png");

    const [alreadyExist,setAlreadyExist]=useState("");
    


    // for register form 
    const registerSubmit=(e)=>{
        e.preventDefault();

        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("password", password);
        myForm.set("avatar", avatar);
        dispatch(register(myForm));
    }

    // for registerDataForm button
    const registerDataChange=(e)=>{
        if(e.target.name==="avatar"){
            const reader = new FileReader();
            reader.onload=()=>{
                if(reader.readyState===2){
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            };
            reader.readAsDataURL(e.target.files[0]);

        }else{
            setUser({...user, [e.target.name]: e.target.value});
        }
    }

    //using location search for getting the correct path
    const redirect = location.search ? location.search.split("=")[1] : "/account";
    //applying swtich effect
    useEffect(() => {
      
        if(error){
            alert.error(error);

          setAlreadyExist(error);

        }
        //if the user authentication is true then it clear the form for user
        if(isAuthenticated){
            history.push(redirect)
        }
            
        
    }, [dispatch, error, alert, history, isAuthenticated, redirect])// giving all the dependences
    



    return (
        <>
       <div className='container d-flex flex-column justify-content-center align-items-center login-center'>

        {loading && <Loading />}
                        {/* for signup form */}
                        <form 
                            className="Login col-md-8 col-lg-4 col-11"
                            encType='multipart/form-data'//this is mandatory to upload the image of the user
                            onSubmit={registerSubmit}

                        >

                                {/* <FaceIcon/> */}
                                <input
                                    type="text"
                                    placeholder='Full Name'
                                    required
                                    name='name'
                                    value={name}
                                    onChange={registerDataChange}

                                />


                            {/* for mail div */}
                                {/* <MailOutlineIcone/> */}
                                <input
                                    type="email"
                                    placeholder='Email'
                                    required
                                    name="email"
                                    value={email}
                                    onChange={registerDataChange}
                                />

                            {/* for password div */}
                            {/* <LockOpenIcon/> */}

                            <input
                                type="password"
                                placeholder='Password' required
                                name='password'
                                value={password}
                                onChange={registerDataChange}
                            />

<div id="registerImage" className='d-flex flex-row'>   
<img  src={avatarPreview} alt="Avatar Preview"/>
                                <input
                                    type="file"
                                    name="avatar"
                                    accept='image/*'
                                    onChange={registerDataChange}
            required="required"

                                />
                                </div>


                            {/* for submit button */}
                           <button type="submit">Register</button>
                           <p>
            <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
              I Have Account <strong>Login</strong>
            </Link>
          </p>

                        </form>

                    </div>


                    </>
    );
}

export default LoginSignUp
