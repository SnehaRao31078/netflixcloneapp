import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./otp.css"
function Otp() {

  const [otp, setOtp] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state.email;

  const verifyOtp = (e) => {

    e.preventDefault();

   axios.post(
  `${import.meta.env.VITE_API_URL}/verify-otp`,
  {
    email: email,
    otp: otp
  }
)
    .then(res => {

      if(res.data.status === "Success"){

        alert("Signin Successful");
              const user = JSON.parse(localStorage.getItem("tempUser"));
               localStorage.setItem("userEmail", user.email);
      localStorage.setItem("userPlan", user.plan);
      localStorage.removeItem("tempUser");

        navigate("/subscribe");

      }else{

        alert("Invalid OTP");

      }

    })
    .catch(err => console.log(err));
  };

  return (

    <div style={{textAlign:"center", marginTop:"150px"}}>
      <p className="logo-p">NETFLIX</p>

      <h2>Enter OTP</h2>

      <form onSubmit={verifyOtp}>

        <input className="otp"
          type="text"
          placeholder="Enter OTP"
          onChange={(e)=>setOtp(e.target.value)}
        />

        <br/><br/>

        <button type="submit" className="otp-btn">Verify OTP</button>

      </form>

    </div>
  );
}

export default Otp;