// import { useLocation } from "react-router-dom";
import API from "../api/axios";
import {useEffect,useState} from "react"
export default function Profile() {
//   const location = useLocation();
//   const user = location.state.user;
    const [user,setUser] = useState({})
    useEffect(()=>{
      API.get("/fetch/profile")
      .then((res)=>{
        if(res.status===200){
          setUser(res.data.user)
        }else{
           alert("Login Failed")
        }
      }).catch((err)=>{
         alert("Some error occured while fetching user data")
      });     
    },[]);
   
    
  return (
    <>
      <div className="mb-3">
      <div className="card" style={{ width: "18rem" }}>
        <h2 className="card-title">User Information</h2>
        <p className="card-text">Name : {user.name}</p>
        <p className="card-text">Email : {user.email}</p>
        <p className="card-text">Mobile : {user.mobile}</p>
      </div>
      </div>
    </>
  );
}