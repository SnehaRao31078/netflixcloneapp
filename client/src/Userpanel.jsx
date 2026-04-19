import "./panel.css";
import { useNavigate } from "react-router-dom";

function UserDash() {
  const navigate = useNavigate();

  return (
    <>
      <h1>Welcome to User Dashboard</h1>

      <div className="dash">

        
        <div
          className="security-box"
          onClick={() => navigate("/security")}
        >
          <h3>Security Settings</h3>
        </div>

       
        <div
          className="membership-box"
          onClick={() => navigate("/membership")}
        >
          <h3>Membership & Billing</h3>
        </div>

      </div>
    </>
  );
}

export default UserDash;

