import React, { useState } from "react";
import "./signuppass.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const  navigate=useNavigate();  
  /*const handleSubmit = (e) => {
  e.preventDefault();

  axios
    .post(`${import.meta.env.VITE_API_URL}/signup`, {
      name,
      email,
      password,
    })
    .then((res) => {
      console.log(res.data);

      localStorage.setItem("userEmail", email);
      localStorage.setItem("userPlan", "");

      alert("Signup successful");

      navigate("/");
    })
    .catch((err) => {
      console.log(err);
      alert("Server not responding");
    });
};*/
const handleSubmit = (e) => {
  e.preventDefault();

  axios
    .post(`${import.meta.env.VITE_API_URL}/signup`, {
      name,
      email,
      password,
    })
    .then((res) => {
  console.log(res.data);

  if (res.data.status === "SUCCESS") {
    alert(res.data.message);

    localStorage.setItem("userEmail", email);

   
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
<button type="submit">
    Signup
          </button>
        </form>
      </div>
    </>
  );
}

export default Signup;
