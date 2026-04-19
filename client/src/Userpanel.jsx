/*import "./panel.css";
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

export default UserDash;*/
import "./panel.css";
import { useNavigate } from "react-router-dom";

function UserDash() {
  const navigate = useNavigate();

  return (
    <>
      <h1>Welcome to User Dashboard</h1>

      <div className="dash">
        <div className="card-box" onClick={() => navigate("/security")}>
          <h2>
            <i className="fa-solid fa-lock"></i>Security Settings
          </h2>
          <p>Manage password, login activity & privacy</p>
        </div>

        <div className="card-box" onClick={() => navigate("/membership")}>
          <h2>
           
            <i className="fa-solid fa-credit-card"></i>
            Membership & Billing
          </h2>
          <p>View plans, upgrade or manage billing</p>
        </div>
      </div>
    </>
  );
}

export default UserDash;
