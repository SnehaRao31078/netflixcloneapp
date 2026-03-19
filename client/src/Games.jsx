import "./games.css";

function Games() {
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
            <button className="play-btn">
              <i className="fas fa-mobile"></i> Get Mobile Game
            </button>

            <button className="info-btn">
              <i className="fa-solid fa-circle-info"></i> More Info
            </button>
          </div>
        </div>
      </div>

     

      <div className="rows">
       
        <h2 className="row-title">Popular Mobile Games</h2>
        <div className="row-wrapper">
          <button className="scroll-btn left" onClick={() => scrollLeft("g1")}>
            ‹
          </button>
          <div className="row-posters" id="g1">
            <div className="poster-item">
              <img src="/game1.jpg" />
              <p>Red Dead Reedemption</p>
            </div>

            <div className="poster-item">
              <img src="/game2.jpg" />
              <p>WWE 2K25 Edition</p>
            </div>

            <div className="poster-item">
              <img src="/game3.jpg" />
              <p>Netflix puzzled</p>
            </div>

            <div className="poster-item">
              <img src="/game4.jpg" />
              <p>FootBall Manager</p>
            </div>

            <div className="poster-item">
              <img src="/game5.jpg" />
              <p>Street Fighter IV CE</p>
            </div>

            <div className="poster-item">
              <img src="/game6.jpg" />
              <p>Farming Simulator</p>
            </div>

            <div className="poster-item">
              <img src="/game7.jpg" />
              <p>Squid Game</p>
            </div>

            <div className="poster-item">
              <img src="/game8.jpg" />
              <p>Storyteller</p>
            </div>

            <div className="poster-item">
              <img src="/game9.jpg" />
              <p>Snake.io</p>
            </div>

            <div className="poster-item">
              <img src="/game10.jpg" />
              <p>Lays Horizon</p>
            </div>
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
          <button className="scroll-btn left" onClick={() => scrollLeft("g2")}>
            ‹
          </button>

          <div className="row-posters" id="g2">
            <div className="poster-item">
              <img src="/pick1.jpg" />
              <p>Cut the Rope Daily</p>
            </div>

            <div className="poster-item">
              <img src="/pick2.jpg" />
              <p>Solitarie</p>
            </div>

            <div className="poster-item">
              <img src="/pick3.jpg" />
              <p>PinBall</p>
            </div>

            <div className="poster-item">
              <img src="/pick4.jpg" />
              <p>Sonic Prime Dash</p>
            </div>

            <div className="poster-item">
              <img src="/pick5.jpg" />
              <p>Word Trails</p>
            </div>

            <div className="poster-item">
              <img src="/pick6.jpg" />
              <p>Heads Up</p>
            </div>

            <div className="poster-item">
              <img src="/pick7.jpg" />
              <p>Hearts</p>
            </div>

            <div className="poster-item">
              <img src="/pick8.png" />
              <p>Krispee Street</p>
            </div>

            <div className="poster-item">
              <img src="/pick9.jpg" />
              <p>Shooting hoops</p>
            </div>

            <div className="poster-item">
              <img src="/pick10.jpg" />
              <p>Knittens:Cats and Dogs</p>
            </div>
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
            From familiar favorites to Netflix exclusives,get unlimited mobile
            games in Netflix <br />
            app- all included in your membership.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Games;
