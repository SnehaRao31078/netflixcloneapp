import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

function Plan() {
  const [email, setEmail] = useState("");
  const [card, setCard] = useState("");
  const [holder, setHolder] = useState("");
  const [country, setCountry] = useState("");
  const location = useLocation();

const { plan, price } = location.state || {};
  const [status, setStatus] = useState("");
  

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { email, card, holder, country, plan, price };

    try {
const res = await axios.post(
  `${import.meta.env.VITE_API_URL}/plans`,
  data
);

      if (res.data.success) {
        localStorage.setItem("userPlan", plan);
        setStatus("success");
        alert("Payment successful");
        navigate("/home");
      } else {
        setStatus("failed");
        alert("Subscribe to plan");
        navigate("/subscribe");
      }
    } catch (err) {
      console.error(err);
      setStatus("failed");
      alert("Payment failed");
      navigate("/subscribe");
    }
  };

  return (
    <>
      <h1>Subscribe to {plan} plan</h1>
      <h2>Monthly price:${price}</h2>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter The Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="text"
            placeholder="Enter card details"
            value={card}
            onChange={(e) => setCard(e.target.value)}
          />

          <input
            type="text"
            placeholder="Cardholder Name"
            value={holder}
            onChange={(e) => setHolder(e.target.value)}
          />

          <div>
            <select
              className="inputfield"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option value="">Choose a Country:</option>
              <option value="india">India</option>
            </select>
          </div>

          <button type="submit">Subscribe</button>
        </form>
        {status === "success" && (
          <h2 style={{ color: "green" }}>Payment Successful </h2>
        )}

        {status === "failed" && (
          <h2 style={{ color: "red" }}>subscribe to plan </h2>
        )}
      </div>
    </>
  );
}

export default Plan;
