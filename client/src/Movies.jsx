import "./movies.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Movies() {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/products`)
      .then((res) => {
        setMovies(res.data);
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
    <div className="movies-page">

      {/* Oddballs and Outcasts */}
      <h2 className="row-title">Oddballs and Outcasts</h2>

      <div className="row-wrapper">
        <button
          className="scroll-btn left"
          onClick={() => scrollLeft("row1")}
        >
          ‹
        </button>

        <div className="row-posters" id="row1">
          {movies
            .filter((movie) => movie.category === "oddballs")
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


      {/* Horror Movies */}
      <h2 className="row-title">Horror Movies</h2>

      <div className="row-wrapper">
        <button
          className="scroll-btn left"
          onClick={() => scrollLeft("row2")}
        >
          ‹
        </button>

        <div className="row-posters" id="row2">
          {movies
            .filter((movie) => movie.category === "horror")
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


      {/* Indian Social Issue Dramas */}
      <h2 className="row-title">Indian Social Issue Dramas</h2>

      <div className="row-wrapper">
        <button
          className="scroll-btn left"
          onClick={() => scrollLeft("row3")}
        >
          ‹
        </button>

        <div className="row-posters" id="row3">
          {movies
            .filter((movie) => movie.category === "social drama")
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


      {/* Action Thrillers */}
      <h2 className="row-title">Action Thrillers</h2>

      <div className="row-wrapper">
        <button
          className="scroll-btn left"
          onClick={() => scrollLeft("row4")}
        >
          ‹
        </button>

        <div className="row-posters" id="row4">
          {movies
            .filter((movie) => movie.category === "action thriller")
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
  );
}

export default Movies;