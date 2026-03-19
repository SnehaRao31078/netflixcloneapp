import React, { useState } from "react";
import "./signuppass.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";



function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const  navigate=useNavigate();  
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://netflix-cloneapp-backend.onrender.com/signup", { name, email, password })
      .then((result) => {
        console.log(result);
        alert ("signup successful");
        navigate("/");
        
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div className="box">
        <form onSubmit={handleSubmit}>
          <h2>Create Account</h2>
          <input
            type="text"
            placeholder="name"
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
<button onClick={()=>handleSubmit}>
    Signup
          </button>
        </form>
      </div>
    </>
  );
}

export default Signup;
