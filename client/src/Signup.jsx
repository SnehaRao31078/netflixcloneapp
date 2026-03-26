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

  console.log(import.meta.env.VITE_API_URL); 

  axios.post(`${import.meta.env.VITE_API_URL}/signup`, { name, email, password })
    .then((res) => {
      console.log(res.data);

      if (res.data.status === "SUCCESS") {
        const user = res.data.user;

        localStorage.setItem("userEmail", user.email);
        localStorage.setItem("userPlan", user.plan || "");

        if (user.plan) {
          navigate("/home");
        } else {
          navigate("/subscribe");
        }

      } else {
        alert(res.data.status);
      }
    })
    .catch((err) => {
      console.log(err);
      alert("Server not responding");
    });
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
<button >
    Signup
          </button>
        </form>
      </div>
    </>
  );
}

export default Signup;
