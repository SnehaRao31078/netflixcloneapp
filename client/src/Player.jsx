import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./player.css";
function Player() {
  const { id } = useParams();
  
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);

  useEffect(() => {
    axios
      .get("https://netflix-cloneapp-backend.onrender.com/products/" + id)

      .then((res) => {
        setMovie(res.data);
      })

      .catch((err) => console.log(err));
  }, [id]);

  if (!movie) {
    return <h2>Loading...</h2>;
  }

  return (
    <div style={{ background: "black", color: "white", padding: "30px" }}>
      <button onClick={() => navigate("/home")} className="player-btn">Back</button>

      <h1>{movie.title}</h1>

      <iframe
        width="800"
        height="450"
        src={movie.videoLink + "?autoplay=1&controls=1"}
        title="trailer"
        
        allow="autoplay; encrypted-media"
        allowFullScreen
      ></iframe>

      <p className="movie-description">{movie.description}</p>
    </div>
  );
}

export default Player;
