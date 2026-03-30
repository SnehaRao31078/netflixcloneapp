import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./player.css";
function Player() {
  const { id } = useParams();
  
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/products/${id}`)

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

    <video
  width="800"
  height="450"
  controls
  poster={`${import.meta.env.VITE_API_URL}/Images/${movie.file}`}
>
  <source
    src={`${import.meta.env.VITE_API_URL}/Images/${movie.video}`}
    type="video/mp4"
  />
  Your browser does not support the video tag.
</video>

      <p className="movie-description">{movie.description}</p>
    </div>
  );
}

export default Player;
