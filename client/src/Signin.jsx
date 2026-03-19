import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./signin.css";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post(`${import.meta.env.VITE_API_URL}/signin`, { email, password })
      .then((result) => {
        if (result.data.status === "OTP Sent") {
          
          localStorage.setItem("tempUser", JSON.stringify(result.data.user));
          navigate("/otp", { state: { email } });
        } else if (result.data.status === "User not found") {
          alert("User not found");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="signin-page">
      <p className="logo-signin">NETFLIX</p>
      <Link to="/adminlog" className="admin-btn">Admin Login</Link>

      <div className="signin-wrapper">
        <div className="container">
          <form onSubmit={handleSubmit}>
            <h1>Enter your info to sign in</h1>
            <h2>Or get started with a new account.</h2>

            <input
              type="text"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit">Continue</button>
          </form>

          <div className="help">
            <Link to="/signup">Signup if you don't have account</Link>
            <Link to="/learn">Learn more about sign-in</Link>
            <Link to="/forgot">Forgot email or mobile number?</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;