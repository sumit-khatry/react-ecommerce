import React, { Fragment, useState, useEffect } from 'react'
import "./UpdateProfile.css";
import Loading from '../components/LoadingError/Loading';
import MailOutlineIcone from "@material-ui/icons/MailOutline";
import FaceIcon from "@material-ui/icons/Face";
import {useDispatch, useSelector} from "react-redux";
import{clearErrors,  loadUser,  updateProfile} from "../actions/userAction";
import {useAlert} from "react-alert"
import { UPDATE_PROFILE_RESET } from '../constants/userConstants';
import MetaData from '../components/LoadingError/MetaData';

const UpdateProfile = ({history}) => {
    const dispatch = useDispatch();
    const alert= useAlert();

    //pulling error by using useselector
    const{user} = useSelector(state => state.user);
    const{ error, isUpdated, loading} = useSelector((state)=> state.profile);
    
    const [name, setName]= useState("");
    const [email, setEmail]= useState("");
    const[avatar, setAvatar]= useState();
    const[avatarPreview, setAvatarPreview]= useState("/Profile.png");

    const updateProfileSubmit=(e)=>{
        e.preventDefault();

        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("avatar", avatar);
        dispatch(updateProfile(myForm));
    }

    // for updateprofileDataForm button
    const updateProfileDataChange=(e)=>{

            const reader = new FileReader();
            reader.onload=()=>{
                if(reader.readyState===2){
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            };
            reader.readAsDataURL(e.target.files[0]);

   
    };
    //applying use effect
    useEffect(() => {
        // if user is register
        if(user){
            setName(user.name);
            setEmail(user.email);
            setAvatarPreview(user.avatar.url);
        }
      
        if(error){
            alert.error(error);
            dispatch(clearErrors());

        }
        //if the user authentication is true then it clear the form for user
        if(isUpdated){
            alert.success("Profile updated successfully");
            dispatch(loadUser());

            history.push("/account")
            dispatch({
                type:UPDATE_PROFILE_RESET,

            });
        }
            
        
    }, [dispatch, error, alert, history, user, isUpdated]);
    return (
        <Fragment>
            {loading? (<Loading/>
            ):(
                <Fragment>
                <MetaData title="Update Profile"/>
                <div className='updateProfileContainer'>
                    <div className='updateProfileBox'>
                        <h2 className="updateProfileHeading">UpdateProfile</h2>
                        <form 
                            className='updateProfileForm'
                             
                            encType='multipart/form-data'//this is mandatory to upload the image of the user
                            onSubmit={updateProfileSubmit}
    
                            >
                            <div className='updateProfileName'>
    
                                <FaceIcon/>
                                <input
                                    type="text"
                                    placeholder='Name'
                                    required
                                    name='name'
                                    value={name}
                                    onChange={(e)=>setName(e.target.value)}
                                />
    
    
                            </div>
                                {/* for mail div */}
                            <div className="updateProfileEmail">
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
                               
                            <div id="updateProfileImage">
                                <img src={avatarPreview} alt="Avatar Preview"/>
                                <input
                                    type="file"
                                    name="avatar"
                                    accept='image/*'
                                    onChange={updateProfileDataChange}
                                />
    
                            </div>
                                {/* for submit button */}
                            <input
                                type="submit"
                                value="Update"
                                className='updateProfileBtn'
                                    // disabled={loading ? true:false}
                            />
    
                        </form>
    
                    </div>
                </div>
                </Fragment>

            
            )
        }
        </Fragment>
        
    );
}

export default UpdateProfile;
