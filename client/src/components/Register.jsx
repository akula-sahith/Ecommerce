import React,{useState} from 'react'
import API from '../api/axios'
export default function Register() {
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [mobile,setMobile]=useState("")
    const [vendor,setVendor]=useState(false)
    function handleRegister(e){
        e.preventDefault()
       
        API.post("/auth/register",{name,email,password,mobile:Number(mobile),isVendor:Boolean(vendor)})
            .then((res)=>{
                console.log(res)
                if(res.status===201){
                    alert("Registration successfully")
                }
            })
            .catch(err=>{
                console.log(err)
            })
    }
    return (
        <div className='container'>
            <div className='row'>
                <form onSubmit={handleRegister} className='col-12 col-md-6'>
                    <div className='mb-3'>
                        <h1>Register</h1>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="" className="form-label">Name</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            name="name"
                            onChange={(e)=>setName(e.target.value)}/>
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
                    <div className="mb-3">
                        <label htmlFor="" className="form-label">Mobile Number</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            name="mobile"
                            onChange={(e)=>setMobile(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="" className="form-label">Join As</label>
                        <select 
                            className="form-control" 
                            name="vendor"
                            onChange={(e)=>setVendor(e.target.value)}
                        >
                            <option value={false}>Customer</option>
                            <option value={true}>Vendor</option>
                        </select>
                    </div>
                    <button className='btn btn-success'>Register</button>
                </form>
            </div>

        </div>
    )
}