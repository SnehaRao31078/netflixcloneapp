import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState ,useRef} from "react";
import axios from "axios";

import "./player.css";
function Player() {
  const { id } = useParams();
  
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
   const [showControls, setShowControls] =useState(false);
   const videoRef = useRef(null);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/products/${id}`)

      .then((res) => {
        setMovie(res.data);
      })

      .catch((err) => console.log(err));
  }, [id]);

 if(!movie)
  {
    return <h2>Loading...</h2>;
  }

  const toogleControls = () => {
  setShowControls(true);

  if (videoRef.current) {
    videoRef.current.play();   
  }
};

  /*return (
    <div style={{ background: "black", color: "white", padding: "30px" }}>
      <button onClick={() => navigate("/home")} className="player-btn">Back</button>

      <h1>{movie.title}</h1>

    <video
  ref={videoRef}
  width="800"
  height="450"
    controls={showControls}
  poster={movie.file} 
  onClick={toogleControls}
>
  <source
    src={movie.video}
    type="video/mp4"
  />
  Your browser does not support the video tag.
</video>

      <p className="movie-description">{movie.description}</p>
       <p className="movie-language">{movie.language}</p>
    </div>
  );
}
*/
return (
  <div className="player-container" style={{ background: "black", color: "white", padding: "30px", minHeight: "100vh" }}>
    
    <button onClick={() => navigate("/home")} className="player-btn">
      Back
    </button>

    <h1>{movie.title}</h1>

    <div className="video-wrapper">
      <video
        ref={videoRef}
        width="800"
        height="450"
        controls={showControls}
        poster={movie.file}
        onClick={toogleControls}
      >
        <source src={movie.video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>

    <p className="movie-description">{movie.description}</p>
    <p className="movie-language">{movie.language}</p>
  </div>
);
}
export default Player;
