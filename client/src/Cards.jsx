import "./cards.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Charts from "./Charts";

function Cards() {
  const [counts, setCounts] = useState({
    totalUsers: 0,
    totalSubscriptions: 0,
    totalMovies: 0,
  });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/dashboard-counts`
        );
        setCounts(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCounts();
  }, []);

  return (
    <main className="main-container">
      
      <div className="main-title">
        <h3>DASHBOARD</h3>
      </div>

      
      <div className="main-cards">
       
        <div className="cards">
          <div className="cards-inner">
            <h3>
              <span>
                <i className="fa-solid fa-film"></i>
              </span>
              Number of Movies
            </h3>
            <p>{counts.totalMovies}</p>
          </div>
        </div>

        
        <div className="cards">
          <div className="cards-inner">
            <h3>
              <span>
                <i className="fa-solid fa-user"></i>
              </span>
              Number of Users
            </h3>
            <p>{counts.totalUsers}</p>
          </div>
        </div>

       
        <div className="cards">
          <div className="cards-inner">
            <h3>
              <span>
                <i className="fa-solid fa-credit-card"></i>
              </span>
              Number of Subscriptions
            </h3>
            <p>{counts.totalSubscriptions}</p>
          </div>
        </div>
      </div>

      
      <div className="charts">
        <Charts />
      </div>
    </main>
  );
}

export default Cards;