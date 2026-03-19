import "./adminlog.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Adminlog() {
    const [email, setEmail] = useState("");
     const [password, setPassword] = useState("");

     const ADMIN_EMAIL="sneha123@gmail.com";
     const ADMIN_PASS="sneha123#*";
     
     const  navigate=useNavigate();
     const handleSubmit=(e)=>
     {
        e.preventDefault();
        if(email===ADMIN_EMAIL && password===ADMIN_PASS)
        {
              navigate("/admindash");
        }
        else{
            alert("Incorrect login credentials");
        }
     }
  return (
     
    <div className="admin">
      
    
            <img src="/netflixxx.jpeg" className="logo" alt="Netflix" />
            
        <div className="signin-wrapper">
        <div className="container">
           <form onSubmit={handleSubmit}>
            <h1>Enter your info to signin info </h1>
            

            <input
              type="text"
              placeholder="Email"
              onChange={(e) =>setEmail(e.target.value)}
              
            />

            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit">
                Continue </button>
            </form>
            </div>
            </div>
          

          
            
          </div>
      
      
      
     
   
  );
}



export default Adminlog;