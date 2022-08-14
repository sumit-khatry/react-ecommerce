import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Message from "../components/LoadingError/Error";
import Loading from "../components/LoadingError/Loading";
import{ login,clearErrors} from "../actions/userAction";
import { useAlert } from "react-alert";
import MetaData from "../components/LoadingError/MetaData";


const Login = ({ location, history }) => {
  window.scrollTo(0, 0);
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");


  const redirect = location.search ? location.search.split("=")[1] : "/account";
const alert=useAlert();
  const userLogin = useSelector((state) => state.user);
  const { error, loading, userInfo ,isAuthenticated} = userLogin;

  const dispatch = useDispatch();
  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [userInfo, history, redirect]);

 

  const[loginEmail, setLoginEmail]= useState("");
  const[loginPassword, setLoginPassword]= useState("");

  const [user, setUser]= useState({
      name:"",
      email:"",
      password:"",
  });


  const loginSubmit=(e)=>{
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));

};


useEffect(() => {
      
  if(error){
    alert.error(error);

      dispatch(clearErrors());
  }

  // }
  //if the user authentication is true then it clear the form for user
  if(isAuthenticated){
      history.push(redirect)
  }
      
  
}, [dispatch, error, history, isAuthenticated, redirect])// giving all the dependences


  return (
    <>
      <div className="container d-flex flex-column justify-content-center align-items-center login-center">
        <MetaData title="login" />
        {loading && <Loading />}
        <form
          className="Login col-md-8 col-lg-4 col-11"
          onSubmit={loginSubmit}
        >
          <input
            type="email"
            placeholder="Email"
            required="required"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required="required"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
          />
          <button type="submit">Login</button>
          <p>
            <Link
              to="/password/forgot"
              
            >
              Forget password?
            </Link>
          </p>
          <p>
            <Link
              to={redirect ? `/register?redirect=${redirect}` : "/register"}
            >
              Create Account
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
