import React,{useState,useContext} from 'react'
import {Link,useHistory} from "react-router-dom"
import {createcontext} from "../../App"
import "./signup.css"
import {toast} from "react-toastify"
function Signup(props){
    const history = useHistory()
    const main = useContext(createcontext)
    const [loggedin,setloggedin] = main.loggedin
    const [currentuser,setcurrentuser] = main.currentuser
     const [user,setuser] = useState({
         email:"",
         password:"",
         name:"",
         mobile:""
     })
     function onchange(e){
         setuser({...user,[e.target.name]:e.target.value})
     }
    async function onsubmit(e){
        e.preventDefault()
        const response = await fetch("http://localhost:8000/signup/",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(user)    
    })
    const s = await response.json()
    if(s==="Mobile"){
      toast.error("Enter Valid Mobile No",{className:"text-center font-weight-bold font-italic mt-5 rounded"})
      setloggedin(false)
    }
    else{
    if(s==="User"){
        toast.error("User Already exists",{className:"text-center font-weight-bold font-italic mt-5 rounded"})
        setloggedin(false)
    }
    else{
        let fromback = {
            pk:s[0].pk,
            ...s[0].fields
        }
       setloggedin(true)
       setcurrentuser(fromback)
       toast.success("Successfully Registered",{className:"text-center font-weight-bold font-italic mt-5 rounded"})
       history.push("/homepage")
    }
}
    }
    return(
        <div className="signup pt-5">
{loggedin?<p className="text-center font-weight-normal display-4">Already Logged In</p>:
        <div className="container pt-5">
        <p className="text-center font-weight-normal font-italic display-4" style={{ color:"black"}}>Signup</p>
        <div className="d-flex justify-content-center">
        <form style={{width:"50%"}} onSubmit={onsubmit}>
        <input type="email" name="email" placeholder="Email" value={user.email} onChange={e=>onchange(e)} className="form-control my-3" required/>
        <input type="password" name="password" placeholder="Password" value={user.password} onChange={e=>onchange(e)} className="form-control my-3" required/>
        <input type="text" name="name" placeholder="Name" value={user.name} onChange={e=>onchange(e)} className="form-control my-3" required/>
        <input type="text" name="mobile" placeholder="Mobile no" value={user.mobile} onChange={e=>onchange(e)} className="form-control my-3" required/>
        <div className="d-flex justify-content-center mt-4">
        <button className="btn font-weight-bold px-5 btn-warning">SIGNUP</button>
        </div>
        <div className="d-flex justify-content-center">
        <Link to="/login" className="text-center font-italic mt-2" style={{fontWeight:700,color:"black",fontSize:15}}>Existing user?Login</Link>
        </div>
      </form>
        </div>
        </div>
    }
        </div>
    )
}

export default Signup