 import { Link } from "react-router-dom";
 import "./home.css";
 function Nav() {
 return (
 <nav className="navbar">
        <div className="nav-left">
          <div className="logo">NETFLIX</div>

          <ul className="nav-links">
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/shows">Shows</Link></li>
            <li><Link to="/movies">Movies</Link></li>
            <li><Link to="/games">Games</Link></li>
            <li><Link to="/new">New & Popular</Link></li>
            <li><Link to="/mylist">My List</Link></li>
            <li><Link to="/languages">Browse by Languages</Link></li>
          </ul>
        </div>

        <div className="nav-right">
          <i className="fas fa-search icon"></i>
          <span>Children</span>
          <i className="fas fa-bell icon"></i>
         
    <div className="profile">
      <img src="/profile.png" className="top-profile"/>

    
      <div className="profile-menu">

        <div className="menu-row">
          <img src="/redsmile.png"/>
          <span>Lasya</span>
        </div>

        <div className="menu-row">
          <img src="/yellowsmile.png"/>
          <span>Monii</span>
        </div>

        <div className="menu-row">
          <img src="/bluesmile.png"/>
          <span>Sanu</span>
        </div>

        <div className="menu-row">
          <img src="/kids.png"/>
          <span>Kids</span>
        </div>

        <div className="divider"></div>

        <div className="menu-row small">
         <i className="fa-regular fa-pen-to-square"></i>

          <span>Manage Profiles</span>
        </div>

        <div className="menu-row small">
         <i className="fa-solid fa-right-left"></i>

          <span>Transfer Profile</span>
        </div>

        <div className="menu-row small">
          <i className="fa-regular fa-user"></i>

          <span>Account</span>
        </div>

        <div className="menu-row small">
          <i className="fa-regular fa-circle-question"></i>

          <span>Help Centre</span>
        </div>

        <div className="divider"></div>

        <div className="signout">
          Sign out of Netflix
        </div>

      </div>
    </div>

  
        </div>
      </nav>
 )}

export default Nav;