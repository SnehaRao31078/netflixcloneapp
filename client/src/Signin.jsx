import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./signin.css";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState(""); // for auto-filling
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${import.meta.env.VITE_API_URL}/signin`, { email, password })
      .then((result) => {
        console.log(result.data);

        if (result.data.status === "OTP Sent") {
          // Auto-fill OTP for testing
          setOtp(result.data.otp);

          // Store user temporarily
          localStorage.setItem("tempUser", JSON.stringify(result.data.user));

          // Navigate to OTP page, sending OTP as state
          navigate("/otp", { state: { email: email, otp: result.data.otp } });
        } else if (result.data.status === "User not found") {
          alert("User not found");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="signin-page">
      <p className="logo-signin">NETFLIX</p>
      <Link to="/adminlog" className="admin-btn"> Admin Login</Link>

      <div className="signin-wrapper">
        <div className="container">
          <form onSubmit={handleSubmit}>
            <h1>Enter your info to sign in</h1>
            <h2>Or get started with a new account.</h2>

            <input
              type="text"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <button type="submit">Continue</button>
          </form>

          {otp && (
            <div>
              <p>Auto-filled OTP (for testing): {otp}</p>
            </div>
          )}

          <div className="help">
            <Link to="/signup">Signup if you don’t have account</Link>
            <Link to="/learn">Learn more about sign-in</Link>
            <Link to="/forgot">Forgot email or mobile number?</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;