import "./dash.css";
import { useNavigate } from "react-router-dom";

function Dash() {

  const navigate = useNavigate();

  return (<>
    <h1>Welcome to Admin Dashboard</h1>
    <div className="dash">
      

      <div className="add-box" onClick={() => navigate("/addmovies")}>
        <h3>Add Movies Section</h3>
      </div>

      <div className="view-box" onClick={() => navigate("/view")}>
        <h3>View Movies Section</h3>
      </div>
      <div className="hero-box" onClick={() => navigate("/hero")}>
        <h3>Add Hero Section  Movies</h3>
      </div>
      <div className="viewhero-box" onClick={() => navigate("/heroview")}>
        <h3>View Hero Section  Movies</h3>
      </div>
      <div className="viewsub-box" onClick={()=>navigate("/subview")}>
        <h3>View Subscription Section</h3>
      </div>
      
    </div>
    </>
  );
}

export default Dash;
