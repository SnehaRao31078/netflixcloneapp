import "./home.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Home() {
  const [movies, setMovies] = useState([]);
  const [banner, setBanner] = useState(null);
  const navigate = useNavigate();
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

        setMovies(filteredByPlan);
      })
      .catch((err) => console.log(err));
  }, [currentUserPlan]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/banners`)
      .then((res) => {
        setBanner(res.data[0]);
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
   <iframe
  className="hero-video"
  src="https://www.youtube.com/embed/hs3w32RG8L8?autoplay=1&mute=1&controls=0&loop=1&playlist=hs3w32RG8L8"
  title="YouTube video player"
  frameBorder="0"
  allow="autoplay; encrypted-media"
  allowFullScreen
></iframe>
        <div className="hero-content">
          <h1 className="title">Chhaava</h1>
          <p className="description">
            Chhaava is a 2025 Hindi-language historical action drama based on the life of Chhatrapati Sambhaji Maharaj, the second ruler of the Maratha Empire. The film is directed by Laxman Utekar, produced by Dinesh Vijan under Maddock Films, and stars Vicky Kaushal as Sambhaji, with Akshaye Khanna as Aurangzeb.
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
        <h2 className="row-title">Sci-fi Horror</h2>
        <div className="row-wrapper">
          <button
            className="scroll-btn left"
            onClick={() => scrollLeft("row1")}
          >
            ‹
          </button>

         <div className="row-posters" id="row1">
  {movies
    .filter((movie) => movie.category === "sci-fi horror")
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

        <h2 className="row-title">Made in India</h2>
        <div className="row-wrapper">
          <button
            className="scroll-btn left"
            onClick={() => scrollLeft("row2")}
          >
            ‹
          </button>
          <div className="row-posters" id="row2">
            {movies
              .filter((movie) => movie.category === "made in india")
              .map((movie) => (
                <img
                  key={movie.id}
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


 <h2 className="row-title">Comedy-Drama</h2>
        <div className="row-wrapper">
          <button
            className="scroll-btn left"
            onClick={() => scrollLeft("row3")}
          >
            ‹
          </button>
          <div className="row-posters" id="row3">
            {movies
              .filter((movie) => movie.category === "comedy-drama")
              .map((movie) => (
                <img
                  key={movie.id}
                  src={movies.file} 
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


        <h2 className="row-title">Action and adventure Movies</h2>
        <div className="row-wrapper">
          <button
            className="scroll-btn left"
            onClick={() => scrollLeft("row3")}
          >
            ‹
          </button>
          <div className="row-posters" id="row3">
            <img src="/pushpa.jpg" />
            <img src="/og.jpg" />
            <img src="/nara.jpg" />
            <img src="/whisper.jpg" />
            <img src="/animal.jpg" />
            <img src="/bison.jpg" />
            <img src="/sikh.jpg" />
            <img src="/raid.jpg" />
            <img src="/war.jpg" />
            <img src="/dangall.jpg" />
          </div>
          <button
            className="scroll-btn right"
            onClick={() => scrollRight("row3")}
          >
            ›
          </button>
        </div>

        <h2 className="row-title">Bollywood superstars</h2>
        <div className="row-wrapper">
          <button
            className="scroll-btn left"
            onClick={() => scrollLeft("row4")}
          >
            ‹
          </button>
          <div className="row-posters" id="row4">
            <img src="/kabhi.jpg" />
            <img src="/fighter.jpg" />
            <img src="/chennaiexpress.jpg" />
            <img src="/yeh.jpg" />
            <img src="/sikh.jpg" />
            <img src="/veer.jpg" />
            <img src="/jab.jpg" />
            <img src="/dhoom3.jpg" />
            <img src="/jawan.jpg" />
            <img src="/chak.jpg" />
            <img src="/om.jpg" />
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
  );
}

export default Home;
