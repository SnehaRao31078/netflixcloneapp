import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./plan.css";
function Plan() {
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const plan = queryParams.get("type");
  const price = Number(queryParams.get("price"));

  const handlePayment = async () => {
    try {
     
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/payment/process`,
        { amount: price }
      );

      const order = data.order;

      
      const options = {
        key: "rzp_test_SYDNnZrYlyhqer", 
        amount: order.amount,
        currency: "INR",
        name: "Netflix Clone",
        description: plan + " Subscription",
        order_id: order.id,

        handler: async function (response) {
         
          const verifyRes = await axios.post(
            `${import.meta.env.VITE_API_URL}/payment/verify`,
            {
              ...response,
              email,
              plan,
              price,
              country,
            }
          );

          if (verifyRes.data.success) {
            alert("Payment Successful");
            navigate("/home");
          } else {
            alert("Payment Failed");
          }
        },

        prefill: {
          email: email,
        },

        theme: {
          color: "#E50914",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.log(err);
    }
  };

  return (
  <div className="plan-container">
    <div className="plan-card">
      <h1 className="subscribe">Subscribe to {plan} Plan</h1>
      <h2 className="price">Price: ₹{price}</h2>

      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <select value={country} onChange={(e) => setCountry(e.target.value)}>
        <option value="">Select Country</option>
        <option value="India">India</option>
        <option value="USA">USA</option>
      </select>

      <button onClick={handlePayment}>Pay Now</button>
    </div>
  </div>
);
}
export default Plan;



