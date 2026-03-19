import { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

function OTP() {
  const location = useLocation();
  const { email, otp: autoOtp } = location.state;
  const [otp, setOtp] = useState(autoOtp || "");

  const handleVerify = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/verify-otp`, { email, otp });
      alert(res.data.status);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h2>Enter OTP</h2>
      <input
        type="text"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        placeholder="OTP"
      />
      <button onClick={handleVerify}>Verify OTP</button>
    </div>
  );
}

export default OTP;