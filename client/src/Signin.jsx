import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./signin.css";
;
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
        } else {
          toast.error(res.data.status);
        }
      })
      .catch(() => {
        alert("Connection error. Please try again.");
      });
  };

  return (
    <div className="signin-page">
      <p className="logo-signin">NETFLIX</p>
      <Link to="/adminlog" className="admin-btn">
        {" "}
        Admin Login
      </Link>
      <div className="signin-wrapper">
        <div className="container">
          <form onSubmit={handleSubmit}>
            <h1>Enter your info to sign in</h1>
            <h2>Or get started with a new account.</h2>
            <input
              type="text"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Continue</button>
          </form>
          <div className="help">
            <Link to="/signup">Signup if you dont have account</Link>
            <Link to="/learn">Learn more about sign-in</Link>
            <Link to="/forgot">Forgot email or mobile number?</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;
