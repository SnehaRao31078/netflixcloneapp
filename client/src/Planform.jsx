import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function Plan() {
  const { id } = useParams(); 
  const location = useLocation();
  const navigate = useNavigate();

  const { plan: selectedPlan, price: selectedPrice } = location.state || {};

  const [email, setEmail] = useState("");
  const [card, setCard] = useState("");
  const [holder, setHolder] = useState("");
  const [country, setCountry] = useState("");
  const [plan, setPlan] = useState(selectedPlan || "");
  const [price, setPrice] = useState(selectedPrice || "");

  const [status, setStatus] = useState("");

  
  useEffect(() => {
    if (id) {
      axios
        .get(`${import.meta.env.VITE_API_URL}/plans/${id}`)
        .then((res) => {
          const data = res.data;
          setEmail(data.email);
          setCard(data.card);
          setHolder(data.holder);
          setCountry(data.country);
          setPlan(data.plan);
          setPrice(data.price);
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
        alert("Plan Updated Successfully");
      } else {
        // ADD
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/plans`,
          data
        );

        if (res.data.success) {
          localStorage.setItem("userPlan", plan);
          alert("Payment successful");
        } else {
          alert("Subscribe to plan");
        }
      }

      navigate("/viewsub"); 
    } catch (err) {
      console.error(err);
      setStatus("failed");
      alert("Operation failed");
    }
  };

 
  const handleDelete = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/plans/${id}`
      );
      alert("Deleted Successfully");
      navigate("/viewsub");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <h1>{id ? "Edit Plan" : "Subscribe Plan"}</h1>

      <div className="container">
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="text"
            placeholder="Card details"
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
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          >
            <option value="">Choose Country</option>
            <option value="india">India</option>
          </select>

          <input
            type="text"
            placeholder="Plan"
            value={plan}
            onChange={(e) => setPlan(e.target.value)}
          />

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <button type="submit">
            {id ? "Update Plan" : "Subscribe"}
          </button>
        </form>

        
        {id && (
          <button
            onClick={handleDelete}
            style={{ background: "red", color: "white", marginTop: "10px" }}
          >
            Delete Plan
          </button>
        )}

        {status === "failed" && (
          <h2 style={{ color: "red" }}>Operation Failed</h2>
        )}
      </div>
    </>
  );
}

export default Plan;