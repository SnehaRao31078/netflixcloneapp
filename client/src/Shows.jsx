import "./shows.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Shows() {
  const [shows, setShows] = useState([]);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const currentUserPlan = localStorage.getItem("userPlan") || "none";

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/products`)
      .then((res) => {
        const filteredByPlan = res.data.filter((movie) => {
          const userPlan = currentUserPlan?.toLowerCase();
          const moviePlan = movie.plan?.toLowerCase();

          if (userPlan === "premium") return true;

          if (userPlan === "standard") {
            return (
              moviePlan === "standard" ||
              moviePlan === "basic" ||
              moviePlan === "free"
            );
          }

          if (userPlan === "basic") {
            return moviePlan === "basic" || moviePlan === "free";
          }

          return moviePlan === "free";
        });

        setShows(filteredByPlan);
      })
      .catch((err) => console.log(err));
  }, [currentUserPlan]);

  const scrollLeft = (id) => {
    document.getElementById(id).scrollLeft -= 300;
  };

  const scrollRight = (id) => {
    document.getElementById(id).scrollLeft += 300;
  };

  useEffect(() => {
    const userPlan = (localStorage.getItem("userPlan") || "none").toLowerCase();

    if (userPlan === "basic" || userPlan === "standard") {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }, []);

  return (
    <>
      {showModal && (
        <div className="popup">
          <div className="popup-content">
            <div>
              <span className="close" onClick={() => setShowModal(false)}>
                X
              </span>
            </div>
            <h3 className="would">Would u like to watch here?</h3>
            <p>
              Upgrade your plan to start watching here.With Your current plan.you
              can watch on your phone and tablet
            </p>
            <div className="modal-buttons">
              <button
                className="not-nows"
                onClick={() => setShowModal(false)}
              >
                Not Now
              </button>
              <button
                className="see-plans"
                onClick={() => navigate("/subscribe")}
              >
                See all plans
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="home">
        <div className="hero">
          <iframe
 className="hero-video"
  src="https://www.youtube.com/embed/r8O3URprq1M?autoplay=1&mute=0&controls=0&loop=1&playlist=r8O3URprq1M"
  title="YouTube video player"
  frameborder="0"
  allow="autoplay; encrypted-media"
  allowfullscreen
></iframe>

          <div className="overlay"></div>

          <div className="tv-topbar">
            <div className="tv-left">
              <h2> Shows</h2>
            </div>
          </div>

          <div className="hero-content">
            <h1 className="title">Dhurandhar</h1>

            <p className="description">
              The Revenge (Dhurandhar 2) is a 2026 Indian Hindi-language spy action-thriller directed by Aditya Dhar and starring Ranveer Singh, released in theaters on March 19, 2026. As the sequel to the 2025 film, it follows an undercover agent navigating Karachi's criminal underworld while addressing the 26/11 attacks, aiming for a massive pan-India release in five languages.
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
            <button
              className="scroll-btn left"
              onClick={() => scrollLeft("row1")}
            >
              ‹
            </button>

            <div className="row-posters" id="row1">
              {shows
                .filter((movie) => movie.category === "gems-for-you")
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
              onClick={() => scrollRight("row1")}
            >
              ›
            </button>
          </div>

          <h2 className="row-title">Acclaimed writer</h2>
          <div className="row-wrapper">
            <button
              className="scroll-btn left"
              onClick={() => scrollLeft("row2")}
            >
              ‹
            </button>

            <div className="row-posters" id="row2">
              {shows
                .filter((movie) => movie.category === "acclaimed writer")
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
              onClick={() => scrollRight("row2")}
            >
              ›
            </button>
          </div>

          <h2 className="row-title">International TV Shows</h2>
          <div className="row-wrapper">
            <button
              className="scroll-btn left"
              onClick={() => scrollLeft("row3")}
            >
              ‹
            </button>

            <div className="row-posters" id="row3">
              {shows
                .filter(
                  (movie) => movie.category === "international tv shows"
                )
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
              onClick={() => scrollRight("row3")}
            >
              ›
            </button>
          </div>

          <h2 className="row-title">TV comedians</h2>
          <div className="row-wrapper">
            <button
              className="scroll-btn left"
              onClick={() => scrollLeft("row4")}
            >
              ‹
            </button>

            <div className="row-posters" id="row4">
              {shows
                .filter((movie) => movie.category === "tv comedians")
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
              onClick={() => scrollRight("row4")}
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Shows;