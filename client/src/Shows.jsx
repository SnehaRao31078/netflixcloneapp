import "./shows.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Shows() {
  const [shows, setShows] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/products`)
      .then((res) => {
        setShows(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const scrollLeft = (id) => {
    document.getElementById(id).scrollLeft -= 300;
  };

  const scrollRight = (id) => {
    document.getElementById(id).scrollLeft += 300;
  };

  return (
    <div className="home">
      <div className="hero">
        <video
          className="banner-video"
          src="/rook.mp4"
          autoPlay
          muted
          loop
          playsInline
        />

        <div className="overlay"></div>

        <div className="tv-topbar">
          <div className="tv-left">
            <h2>TV Shows</h2>

            
          </div>

          <div className="view-icons">
            <div className="icon-box">
              <i className="fa-solid fa-bars"></i>
            </div>
            <div className="icon-box">
              <i className="fa-solid fa-table-cells"></i>
            </div>
          </div>
        </div>

        <div className="hero-content">
          <h1 className="title">Rook (2020)</h1>

          <p className="description">
            Rook (2020) is a crime thriller about a bar owner
          </p>

          <div className="buttons">
            <button className="play-btn">
              <i className="fas fa-play"></i> Play
            </button>

            <button className="info-btn">
              <i className="fas fa-info-circle"></i> More Info
            </button>
          </div>
        </div>
      </div>

      <div className="rows">

       
        <h2 className="row-title">Gems for You</h2>
        <div className="row-wrapper">
          <button className="scroll-btn left" onClick={() => scrollLeft("row1")}>‹</button>

          <div className="row-posters" id="row1">
            {shows
              .filter((show) => show.category === "gems for you")
              .map((show) => (
                <img
                  key={show._id}
                  src={show.file}
                  alt={show.title}
                  onClick={() => navigate("/player/" + show._id)}
                />
              ))}
          </div>

          <button className="scroll-btn right" onClick={() => scrollRight("row1")}>›</button>
        </div>

   
        <h2 className="row-title">Acclaimed writer</h2>
        <div className="row-wrapper">
          <button className="scroll-btn left" onClick={() => scrollLeft("row2")}>‹</button>

          <div className="row-posters" id="row2">
            {shows
              .filter((show) => show.category === "acclaimed writer")
              .map((show) => (
                <img
                  key={show._id}
                  src={show.file}
                  alt={show.title}
                  onClick={() => navigate("/player/" + show._id)}
                />
              ))}
          </div>

          <button className="scroll-btn right" onClick={() => scrollRight("row2")}>›</button>
        </div>

      
        <h2 className="row-title">International TV Shows</h2>
        <div className="row-wrapper">
          <button className="scroll-btn left" onClick={() => scrollLeft("row3")}>‹</button>

          <div className="row-posters" id="row3">
            {shows
              .filter((show) => show.category === "international tv shows")
              .map((show) => (
                <img
                  key={show._id}
                  src={show.file}
                  alt={show.title}
                  onClick={() => navigate("/player/" + show._id)}
                />
              ))}
          </div>

          <button className="scroll-btn right" onClick={() => scrollRight("row3")}>›</button>
        </div>

        {/* TV comedians */}
        <h2 className="row-title">TV comedians</h2>
        <div className="row-wrapper">
          <button className="scroll-btn left" onClick={() => scrollLeft("row4")}>‹</button>

          <div className="row-posters" id="row4">
            {shows
              .filter((show) => show.category === "tv comedians")
              .map((show) => (
                <img
                  key={show._id}
                  src={show.file}
                  alt={show.title}
                  onClick={() => navigate("/player/" + show._id)}
                />
              ))}
          </div>

          <button className="scroll-btn right" onClick={() => scrollRight("row4")}>›</button>
        </div>

      </div>
    </div>
  );
}

export default Shows;