

import "./games.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Games() {
  const [games, setGames] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/products`)
      .then((res) => {
        setGames(res.data);
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
    <div className="games-page">
      <div className="hero">
        <video
          className="banner-video"
          src="/game.mp4"
          autoPlay
          muted
          loop
          playsInline
          disablePictureInPicture
        />

        <div className="overlay"></div>

        <div className="hero-content">
          <h1 className="title">Red Dead Redemption</h1>

          <p className="description">
            Journey into the sprawling American west and experience action,
            survival and adventure.
          </p>

          <div className="buttons">
            

            <button className="info-btn">
              <i className="fa-solid fa-circle-info"></i> More Info
            </button>
          </div>
        </div>
      </div>

      <div className="rows">
        <h2 className="row-title">Popular Mobile Games</h2>

        <div className="row-wrapper">
          <button
            className="scroll-btn left"
            onClick={() => scrollLeft("g1")}
          >
            ‹
          </button>

          <div className="row-posters" id="g1">
            {games
              .filter((movie) => movie.category === "popular-games")
              .map((movie) => (
                <img
                  key={movie._id}
                  src={movie.file}
                  alt={movie.title}
                  onClick={() => navigate("/player/" + movie._id)}
                />
              ))}
          </div>

          <button
            className="scroll-btn right"
            onClick={() => scrollRight("g1")}
          >
            ›
          </button>
        </div>

        <h2 className="row-title">Pick Up & Play</h2>

        <div className="row-wrapper">
          <button
            className="scroll-btn left"
            onClick={() => scrollLeft("g2")}
          >
            ‹
          </button>

          <div className="row-posters" id="g2">
            {games
              .filter((movie) => movie.category === "pickup-play")
              .map((movie) => (
                <img
                  key={movie._id}
                  src={movie.file}
                  alt={movie.title}
                  onClick={() => navigate("/player/" + movie._id)}
                />
              ))}
          </div>

          <button
            className="scroll-btn right"
            onClick={() => scrollRight("g2")}
          >
            ›
          </button>
        </div>
      </div>

      <div className="games-banner">
        <div className="text-box">
          <h2>Find more games in the mobile app</h2>

          <p>
            From familiar favorites to Netflix exclusives, get unlimited mobile
            games in Netflix app — all included in your membership.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Games;