import { Link, useNavigate } from "react-router-dom";
import "./home.css";
import { useState, useEffect } from "react";
function Nav() {
  const [user, setUser] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (email) {
      setUser(email);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userEmail");

    navigate("/");
    alert("You are  logged out successfully");
  };

  const [value, setValue] = useState("");
  const [data, setData] = useState([]);

  const handleSearch = () => {
    navigate(`/player/${data.find((item) => item.title === value)._id}`);
  };
  const onChange = async (e) => {
    setValue(e.target.value);
    const response = await fetch(`${import.meta.env.VITE_API_URL}/products`);
    const data = await response.json();
    setData(data);
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <div className="logo">NETFLIX</div>

        <ul className="nav-links">
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/shows">Shows</Link>
          </li>
          <li>
            <Link to="/movies">Movies</Link>
          </li>
          <li>
            <Link to="/games">Games</Link>
          </li>
         
        </ul>
      </div>

      <div className="nav-right">
        <div className="search">
          <div className="inputs">
            <input
              type="text"
              placeholder="Search"
              onChange={onChange}
              value={value}
            />
            <button className="search-btn" onClick={handleSearch}>
              Search
            </button>
          </div>
          <div className="search-results">
            {value &&
              data
                .filter(
                  (item) =>
                    item.title.startsWith(value) && item.title !== value,
                )

                .map((item) => (
                  <div key={item.id} onClick={(e) => setValue(item.title)}>
                    {item.title}
                    <hr />
                  </div>
                ))}
          </div>
        </div>
        <span>Children</span>
        <i className="fas fa-bell icon"></i>

        <div className="profile" onClick={() => setOpen(!open)}>
          <img src="/profile.png" className="top-profile" />

          {open && (
            <div className="profile-menu">
              <div className="menu-row">
                <img src="/redsmile.png" />
                <span>{user}</span>
              </div>

              <div className="menu-row">
                <img src="/kids.png" />
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

                <Link to="/panel"> <span>Account</span></Link> 
              </div>

              <div className="menu-row small">
                <i className="fa-regular fa-circle-question"></i>

                <span>Help Centre</span>
              </div>

              <div className="divider"></div>

              <div className="signout" onClick={handleLogout}>
                Sign out of Netflix
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Nav;
