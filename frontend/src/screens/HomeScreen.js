import React,{useEffect,useState} from "react";
import ShopSection from "./../components/homeComponents/ShopSection";
import {useSelector} from 'react-redux'
const HomeScreen = ({ match }) => {
//   const {isAuthenticated, user,userInfo}= useSelector((state)=> state.user);
// console.log(user);
const [first, setfirst] = useState(false)
const data=localStorage.getItem("userInfo")
const obj=JSON.parse(data);


const getdata=()=>{
  try{
    console.log(Object.keys(obj))
    if (Object.keys(obj).length>0){
      console.log("true")
    }
    else{
      console.log("Gg")
    }
    }
    catch(err){
      console.log(err)
    }
    

}
useEffect(() => {
 getdata()
}, [])



  
  window.scrollTo(0, 0);
  const keyword = match.params.keyword;
  const pagenumber = match.params.pagenumber;
  return (
    <div>
      {/* <Header /> */}
      <ShopSection keyword={keyword} pagenumber={pagenumber} />
      {/* <CalltoActionSection /> */}
      {/* <ContactInfo /> */}
      {/* <Footer /> */}
    </div>
  );
};

export default HomeScreen;
