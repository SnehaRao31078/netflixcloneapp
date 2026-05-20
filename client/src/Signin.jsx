import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./signin.css";
import { toast } from "react-toastify";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${import.meta.env.VITE_API_URL}/signin`, { email, password })
      .then((res) => {
        if (res.data.status === "SUCCESS") {
          localStorage.setItem("userEmail", res.data.user.email);
          localStorage.setItem("userPlan", res.data.user.plan);
          toast.success("Login successful");
          navigate("/home");
        } else if (res.data.status === "OTP_SENT") {
          navigate("/otp", { state: { email } });
          toast.success("Otp sent");
        } else {
          toast.error(res.data.status);
        }
      })
      .catch(() => {
        toast.error("Connection error. Please try again.");
      });
  };

  return (
    <div className="signin-page">
      <header className="signin-header">
        <p className="logo-signin">NETFLIX</p>
        <Link to="/adminlog" className="admin-btn">
          Admin Login
        </Link>
      </header>

      <main className="signin-wrapper">
        <div className="container">
          <form onSubmit={handleSubmit}>
            <h1 className="tit">Enter your info to sign in</h1>
            <h2 className="sub-tit">Or get started with a new account.</h2>
            
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="continue-btn">Continue</button>
          </form>
          
          <div className="help">
            <Link to="/signup">Signup if you dont have account</Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Signin;