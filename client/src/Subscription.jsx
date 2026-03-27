import "./sub.css";
import { useNavigate} from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
function Subscription() {
  const navigate = useNavigate();

 
  useEffect(() => {
    const plan = localStorage.getItem("userPlan");
    if (plan) {
      navigate("/home");
    }
  }, []);

  
  const handlePlan = (plan, price) => {
    const email = localStorage.getItem("userEmail");

    if (!email) {
      alert("Please login first");
      navigate("/");
      return;
    }

    axios
      .post(`${import.meta.env.VITE_API_URL}/plans`, {
        email,
        plan,
        price,
      })
      .then((res) => {
        console.log(res.data);

      
        localStorage.setItem("userPlan", plan);

        
        navigate("/plan", { state: { plan, price } });
      })
      .catch((err) => {
        console.log(err);
        alert("Subscription failed");
      });
  };
 return(
            <>
            <p className="logo-signin">NETFLIX</p>
            <h1>Choose the plan that is right for u </h1>
            <p><i className="fa solid fa-check"></i> Watch all u want</p>
             <p><i className="fa solid fa-check"></i>Recommendation just for you</p>
             <p><i className="fa solid fa-check"></i>Change or cancel your plan anytime</p>
             <div className="plan">
             <div className="basic">
                Basic with add
                <h3>Monthly price:<br></br>
                <p className="video">$99.99</p>
               </h3>
                <hr></hr>
                <h3 > Video and voice quality<br></br>
               <p className="video">Best</p> 
                </h3>
                <hr></hr>
                 <h3>Resolution</h3>
               <p className="video">4K</p>
               <hr></hr>
       <button onClick={() => handlePlan("basic", 99.99)}>
            Choose Basic Plan
          </button>
             </div>

              <div className="basic">
               Standard
               <h3>Monthly price:<br></br>
               <p className="video">$149.99</p></h3>
               <p></p><hr></hr>
               <h3>Voice and Video Quality</h3>
               <p className="video">Great</p>
               <hr></hr>
              <h3>Resolution</h3>
              <p className="video">1080p</p>
              <hr></hr>
               <button onClick={() => handlePlan("standard", 149.99)}>
            Choose Standard Plan
          </button>
             </div>


             <div className="basic">
                Premium
                <h3>Monthly price:
                    <br></br>
                    <p className="video">$199.99</p>
                </h3>
                <p></p><hr></hr>
                <h3>Video and sound quality</h3>
                <p className="video">Excellent</p>
                <hr/>
                <h3>Resolution</h3>
                <p className="video">1080p</p>
                <hr></hr>
                  <button onClick={() => handlePlan("premium", 199.99)}>
            Choose Premium Plan
          </button>
             </div>
             </div>
           
 
            </>
        );
    }

export default Subscription;