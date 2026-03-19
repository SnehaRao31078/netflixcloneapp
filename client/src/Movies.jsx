import { useEffect ,useState} from "react";
import "./movies.css";

function Movies() {
const[movies,setMovies]=useState([]);
const[tvshows,setTvshows]=useState([]);
const [trailerKey, setTrailerKey] = useState(null);
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NGFjYzIxYjZhYWIzMzA1YmVjZjJlMjY2ODU4MzNmOSIsIm5iZiI6MTc3MTQ3MzE5MS4yNDQsInN1YiI6IjY5OTY4OTI3N2NjM2U3YTc1YjI4OTFiOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OE81_h1xDH8OAVSNqtUpspq7Dw0Maa6LOSKdOZiSyhQ'
  }
};
  const scrollLeft = (id) => {
    document.getElementById(id).scrollLeft -= 300;
  };

  const scrollRight = (id) => {
    document.getElementById(id).scrollLeft += 300;
  };
useEffect(() => {
    fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
      .then(response => response.json())
      .then(response => setMovies(response.results))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    fetch('https://api.themoviedb.org/3/tv/popular?language=en-US&page=1', options)
      .then(response => response.json())
      .then(response => setTvshows(response.results))
      .catch(err => console.error(err));
  }, []);
  
const handleMovieClick = async (movieId) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/videos`,
    options
  );

  const data = await response.json();

  if (data.results.length > 0) {
    setTrailerKey(data.results[0].key);
  }
};
  
  return (
    <div className="home">

    
      <div className="hero">

        <video
          className="banner-video"
          src="/sarwam.mp4"
          autoPlay
          muted
          loop
          playsInline
        />

        <div className="overlay"></div>

        
        <div className="tv-topbar">
  <div className="tv-left">
    <h2>Movies</h2>

    <div className="genre-dropdown">
      <select>
        <option>Genres</option>
        <option>Oddballs and out casts</option>
        <option>Horror Movies</option>
        <option>Indian social issue dramas</option>
        <option>Action Thrillers</option>
      </select>
    </div>
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
          <h1 className="title">Sarwam Maya</h1>

          <p className="description">
           
Sarvam Maya is a 2025 Malayalam whimsical horror-comedy/musical exploring life's illusions, featuring a musician who becomes a priest and interacts with a ghost.           </p>

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

        
        <h2 className="row-title">Oddballs and out casts</h2>
        <div className="row-wrapper">
          <button className="scroll-btn left" onClick={() => scrollLeft("row1")}>‹</button>
          <div className="row-posters" id="row1">
              
    
\<div className="row-posters" id="row1">
  {movies.map(movie => (
    <img
      key={movie.id}
      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
      alt={movie.title}
      onClick={() => handleMovieClick(movie.id)}
      style={{ cursor: "pointer" }}
    />
  ))}
</div>


{trailerKey && (
  <div className="trailer-container">
    <iframe
      width="800"
      height="450"
      src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
      frameBorder="0"
      allow="autoplay; encrypted-media"
      allowFullScreen
      title="Movie Trailer"
    ></iframe>

    <button onClick={() => setTrailerKey(null)}>Close</button>
  </div>
)}
          </div>
          <button className="scroll-btn right" onClick={() => scrollRight("row1")}>›</button>
        </div>


        
        <h2 className="row-title">Horror Movies</h2>
        <div className="row-wrapper">
          <button className="scroll-btn left" onClick={() => scrollLeft("row2")}>‹</button>
          <div className="row-posters" id="row2">
            {tvshows.map(movie => (
              <img key={movie.id} src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
            ))}
          </div>
          <button className="scroll-btn right" onClick={() => scrollRight("row2")}>›</button>
        </div>


        
        <h2 className="row-title">Indian social issue dramas</h2>
        <div className="row-wrapper">
          <button className="scroll-btn left" onClick={() => scrollLeft("row3")}>‹</button>
          <div className="row-posters" id="row3">
            <img src="/s1.jpg" alt="" />
            <img src="/s2.jpg" alt="" />
            <img src="/s3.jpg" alt="" />
            <img src="/s4.jpg" alt="" />
            <img src="/s5.jpg" alt="" />
            <img src="/s6.jpg" alt="" />
            <img src="/s7.jpg" alt="" />
            <img src="/s8.jpg" alt="" />
            <img src="/s9.jpg" alt="" />
            <img src="/s10.jpg" alt="" />
          </div>
          <button className="scroll-btn right" onClick={() => scrollRight("row3")}>›</button>
        </div>


     
        <h2 className="row-title">Action Thrillers</h2>
        <div className="row-wrapper">
          <button className="scroll-btn left" onClick={() => scrollLeft("row4")}>‹</button>
          <div className="row-posters" id="row4">
            <img src="/t1.jpg" alt="" />
            <img src="/t2.jpg" alt="" />
            <img src="/t3.jpg" alt="" />
            <img src="/t4.jpg" alt="" />
            <img src="/t5.jpg" alt="" />
            <img src="/t6.jpg" alt="" />
            <img src="/t7.jpg" alt="" />
            <img src="/t8.jpg" alt="" />
            <img src="/t9.jpg" alt="" />
            <img src="/t10.jpg" alt="" />
            <img src="/t11.jpg" alt="" />
          </div>
          <button className="scroll-btn right" onClick={() => scrollRight("row4")}>›</button>
        </div>

      </div>

    </div>
  );
}

export default Movies;
