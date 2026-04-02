import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

function Plan() {
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const plan = queryParams.get("type");
  const price = queryParams.get("price");

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
    <>
      <h1>Subscribe to {plan} Plan</h1>
      <h2>Price: ₹{price}</h2>

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
      <br /><br />

      <button onClick={handlePayment}>
        Pay Now
      </button>
    </>
  );
}

export default Plan;



/*import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

function Plan() {
  const [email, setEmail] = useState("");
  const [card, setCard] = useState("");
  const [holder, setHolder] = useState("");
  const [country, setCountry] = useState("");
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [status, setStatus] = useState("");
  const plan = queryParams.get("type");
  const price = queryParams.get("price");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { email, card, holder, country, plan, price };

    try {
      const res = await axios.post(
        `http://localhost:3001/plans`,
        data
      );

      if (res.data.success) {
        localStorage.setItem("userPlan", plan);
        localStorage.setItem("userEmail", email); 
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
      <h2>Monthly price: ₹{price}</h2> 

      <div className="container">
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter The Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Enter card details"
            value={card}
            onChange={(e) => setCard(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Cardholder Name"
            value={holder}
            onChange={(e) => setHolder(e.target.value)}
            required
          />

          <div>
            <select
              className="inputfield"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            >
              <option value="">Choose a Country:</option>
              <option value="india">India</option>
              <option value="pak">Pakistan</option>
            </select>
          </div>

          <button type="submit">Subscribe</button>
        </form>

        {status === "success" && (
          <h2 style={{ color: "green" }}>Payment Successful</h2>
        )}

        {status === "failed" && (
          <h2 style={{ color: "red" }}>Subscribe to plan</h2>
        )}
      </div>
    </>
  );
}

export default Plan;*/


/*import axios from "axios";
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

export default Plan;*/
