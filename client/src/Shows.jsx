import "./shows.css";

function Shows() {

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

    <div className="genre-dropdown">
      <select>
        <option>Genres</option>
        <option>Gems for You</option>
        <option>Acclaimed writer</option>
        <option>International TV Shows</option>
        <option>TV comedians</option>
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
             <img src="/g1.jpg" alt="" />
            <img src="/g2.jpg" alt="" />
            <img src="/g3.jpg" alt="" />
            <img src="/g4.jpg" alt="" />
            <img src="/g5.jpg" alt="" />
            <img src="/g6.jpg" alt="" />
            <img src="/g7.jpg" alt="" />
            <img src="/g8.jpg" alt="" />
            <img src="/g9.jpg" alt="" />
            <img src="/g10.jpg" alt="" />
          </div>
          <button className="scroll-btn right" onClick={() => scrollRight("row1")}>›</button>
        </div>


        
        <h2 className="row-title">Acclaimed writer</h2>
        <div className="row-wrapper">
          <button className="scroll-btn left" onClick={() => scrollLeft("row2")}>‹</button>
          <div className="row-posters" id="row2">
            <img src="/w1.jpg" />
            <img src="/w2.jpg" />
            <img src="/w3.jpg" />
            <img src="/w4.jpg" />
            <img src="/w5.jpg" />
            <img src="/w6.jpg" />
             <img src="/w7.jpg" />
              <img src="/w8.jpg" />
               <img src="/w9.jpg" />
                <img src="/w10.jpg" />
          </div>
          <button className="scroll-btn right" onClick={() => scrollRight("row2")}>›</button>
        </div>


        
        <h2 className="row-title">International TV Shows</h2>
        <div className="row-wrapper">
          <button className="scroll-btn left" onClick={() => scrollLeft("row3")}>‹</button>
          <div className="row-posters" id="row3">
            <img src="/int1.jpg" alt="" />
            <img src="/int2.jpg" alt="" />
            <img src="/int3.jpg" alt="" />
            <img src="/int4.jpg" alt="" />
            <img src="/int5.jpg" alt="" />
            <img src="/int6.jpg" alt="" />
            <img src="/int7.jpg" alt="" />
            <img src="/int8.jpg" alt="" />
            <img src="/int9.jpg" alt="" />
            <img src="/int10.jpg" alt="" />
          </div>
          <button className="scroll-btn right" onClick={() => scrollRight("row3")}>›</button>
        </div>


     
        <h2 className="row-title">TV comedians</h2>
        <div className="row-wrapper">
          <button className="scroll-btn left" onClick={() => scrollLeft("row4")}>‹</button>
          <div className="row-posters" id="row4">
            <img src="/hol1.jpg" alt="" />
            <img src="/hol2.jpg" alt="" />
            <img src="/hol3.jpg" alt="" />
            <img src="/hol4.jpg" alt="" />
            <img src="/hol5.jpg" alt="" />
            <img src="/hol6.jpg" alt="" />
            <img src="/hol7.jpg" alt="" />
            <img src="/hol8.jpg" alt="" />
            <img src="/hol9.jpg" alt="" />
            <img src="/hol10.jpg" alt="" />
            <img src="/hol11.jpg" alt="" />
          </div>
          <button className="scroll-btn right" onClick={() => scrollRight("row4")}>›</button>
        </div>

      </div>

    </div>
  );
}

export default Shows;
