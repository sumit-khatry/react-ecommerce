import React, {Fragment, useEffect} from 'react'
import { useSelector } from 'react-redux'
import Loading from '../components/LoadingError/Loading'
import { Link } from 'react-router-dom'
import MetaData from '../components/LoadingError/MetaData'
import "./Profile.css";
const Profile = ({history}) => {
    const { user,loading, isAuthenticated}= useSelector((state)=> state.user);


    useEffect(()=>{
        if(isAuthenticated===false){
            history.push("/login");
        }

    },[history, isAuthenticated])
    return (
        <Fragment>
            {loading?( <Loading/>):(
                <Fragment>
                    <MetaData title={`${user.name}'s Profile`}/>
                    <div className='profileContainer'>
                        <div>
                            <h1>My Profile</h1>
                            <img src ={user.avatar.url} alt={user.name}/>
                            <Link to= '/me/update'>Edit Profile</Link>
        
                        </div>
                        {/* second div */}
                        <div>
                            {/* for user name only*/}
                            <div>
                                <h4>Full Name</h4>
                                <p>{user.name}</p>
                            </div>
                            {/* for user email */}
                            <div>
                                <h4>Email</h4>
                                <p>{user.email}</p>
                            </div>
                            {/* third div for user joined date */}
                            <div>
                                <h4>Joined ON</h4>
                                <p>{String(user.createdAt).substr(0, 10)}</p>
                            </div>
                            {/* for link to update password */}
                            <div>
                                <Link to='/orders'>My Orders</Link>
                                <Link to="/password/update">Change Password</Link>
                            </div>
        
                        </div>
        
                    </div>
                </Fragment>

            )}
        </Fragment>        
    );
}

export default Profile
