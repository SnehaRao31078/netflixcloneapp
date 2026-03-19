import { useState } from "react";
import { Link } from "react-router-dom";
import "./forgotmail.css";
import backImg from '/girl.webp';

function Forgot() {
  const [type, setType] = useState("email");

  return (
    <div className="page-wrapper" style={{ backgroundImage: `url(${backImg})` }}>
      <div className="forgot-page">
        <header className="header">
          <img src="/blacknet.png" alt="Netflix" />
          <button className="signin"><Link to="/">Sign-in</Link></button>
        </header>

        <div className="box">
          <h2>Update password, email or phone</h2>
          <p>How would you like to reset your password?</p>

          <div className="radio">
            <input
              type="radio"
              name="reset"
              checked={type === "email"}
              onChange={() => setType("email")}
            />
            <label>Email</label>
          </div>

          <div className="radio">
            <input
              type="radio"
              name="reset"
              checked={type === "sms"}
              onChange={() => setType("sms")}
            />
            <label>Text Message (SMS)</label>
          </div>

          {type === "email" && (
            <>
              <p className="info">
                We will send you an email with instructions on how to reset your password.
              </p>
              <input type="email" placeholder="Email" />
              <button className="email-btn">Email Me</button>
            </>
          )}

          {type === "sms" && (
            <>
              <p className="info">
                We will text you a verification code to reset your password. Message and data rates may apply.
              </p>
              <input type="text" placeholder="Mobile number" />
              <button className="email-btn">Message Me</button>
            </>
          )}

          <div className="help-link">
            <Link to="#">I can't remember my email address or phone number.</Link>
          </div>
        </div>
        
  <div className="captcha-wrap">
  <div className="captcha-text">
    This page is protected by Google reCAPTCHA to ensure you're not a bot.
  </div>

  <div className="more">
    <Link to="#" className="learn-more">Learn more.</Link>
  </div>
</div>






        <footer className="footer">
          <div className="footer-container">
            <p className="footer-top">Questions? Call 000-800-919-1743 (Toll-Free)</p>
            <div className="footer-links">
              <Link to="#">FAQ</Link>
              <Link to="#">Help Center</Link>
              <Link to="#">Terms of Use</Link>
              <Link to="#">Privacy</Link>
              <Link to="#">Cookie Preferences</Link>
              <Link to="#">Corporate Information</Link>
            </div>
            <select className="language-select">
              <option>English</option>
              <option>हिन्दी</option>
            </select>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Forgot;