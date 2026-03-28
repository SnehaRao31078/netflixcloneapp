import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function Plan() {
  const { id } = useParams(); 
  const location = useLocation();
  const navigate = useNavigate();

  const { plan, price } = location.state || {};

  const [email, setEmail] = useState("");
  const [card, setCard] = useState("");
  const [holder, setHolder] = useState("");
  const [country, setCountry] = useState("");
  const [status, setStatus] = useState("");

 
  useEffect(() => {
    if (id) {
      axios
        .get(`${import.meta.env.VITE_API_URL}/plans/${id}`)
        .then((res) => {
          setEmail(res.data.email);
          setCard(res.data.card);
          setHolder(res.data.holder);
          setCountry(res.data.country);
        })
        .catch((err) => console.log(err));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { email, card, holder, country, plan, price };

    try {
      if (id) {
       
        await axios.put(
          `${import.meta.env.VITE_API_URL}/plans/${id}`,
          data
        );
        alert("Updated Successfully");
      } else {
      
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/plans`,
          data
        );

        if (res.data.success) {
          localStorage.setItem("userPlan", plan);
          setStatus("success");
          alert("Payment successful");
        } else {
          setStatus("failed");
          alert("Subscribe to plan");
          navigate("/subscribe");
          return;
        }
      }

      navigate("/home");
    } catch (err) {
      console.error(err);
      setStatus("failed");
      alert("Payment failed");
      navigate("/subscribe");
    }
  };

  return (
    <>
      <h1>{id ? "Update Plan" : `Subscribe to ${plan} plan`}</h1>
      <h2>Monthly price: ${price}</h2>

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

          <select
            className="inputfield"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          >
            <option value="">Choose a Country:</option>
            <option value="india">India</option>
          </select>

          <button type="submit">
            {id ? "Update" : "Subscribe"}
          </button>
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

export default Plan;