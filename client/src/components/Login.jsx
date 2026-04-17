// import { use } from "react"
import { useState } from "react"
import API from "../api/axios"
import {useNavigate} from "react-router-dom"
// import {localStorage} from "localStorage"
export default function Login(){

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const navigate = useNavigate()
    // const localStorage = window.localStorage

    function handleLogin(e){
        e.preventDefault()

        API.post("/auth/login",{email,password})
             .then((res)=>{
                if(res.status===200){
                    console.log("Login successful")
                    // const mobile = res.data.mobile
                    // console.log("Mobile number:", mobile)
                    const user = res.data.user
                    console.log("User data:", user)
                    alert("Login successful")
                    localStorage.setItem("token",res.data.token)
                    localStorage.setItem("userRole",res.data.userRole)
                    // localStorage.setItem("user",JSON.stringify(user))
                    navigate("/")
                }else{
                    alert("Login failed")
                }
             })
             .catch((err)=>{
                console.log(err)
                alert("Login failed")
             })
        
    }


    return <>
         {/* <h1>Login Form</h1> */}
        <div className='container'>
            <div className='row'>
                <form onSubmit={handleLogin} className='col-12 col-md-6'>
                    <div className='mb-3'>
                        <h1>Login</h1>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="" className="form-label">Email</label>
                        <input 
                            type="email" 
                            className="form-control" 
                            name="email"
                            onChange={(e)=>setEmail(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="" className="form-label">Password</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            name="password"
                            onChange={(e)=>setPassword(e.target.value)}/>
                    </div>
                    <button className='btn btn-success'>Login</button>
                </form>
            </div>

        </div>
      
    </>
}