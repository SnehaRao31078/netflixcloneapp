import { useState } from "react";
import "./learn.css";
import { Link } from "react-router-dom";

function Learn() {
  const [open, setOpen] = useState(null);

  const toggle = (name) => {
    setOpen(open === name ? null : name);
  };

  return (
    <div className="help-page">
    
   <header className="help-header">
  <div className="header-left">
    <span className="netflix-text">NETFLIX</span>
    <span className="divider">|</span>
    <span className="help-title">Help Center</span>
  </div>



  <div className="header-actions">
    <button className="btn-outline">Join Netflix</button>
    <button className="btn-red">Sign In</button>
  </div>
</header>


      <div className="help-container">
        <div className="help-content">
          <p className="back-link">← Back to Help Home</p>

          <h1>How to sign in to Netflix</h1>
          <p>
            To sign in, follow the steps for your device below. If you're having
            issues signing in, see Can't <Link to="/">sign in to Netflix</Link>.
          </p>

          <h2>TV or TV streaming device</h2>
          <p>
            Sign in on a smart TV or device that connects to a TV, including
            streaming sticks, Apple TV, Xbox, or PlayStation.
          </p>

          
          <div className="accordion" onClick={() => toggle("qr")}>
            <span>{open === "qr" ? "▼" : "▶"}</span>
            Use your phone to sign in with a QR code
          </div>

          {open === "qr" && (
            <div className="accordion-content">
              <img src="/qr.png" alt="QR" className="qr-image" />
              <ol>
                <li>
                  On your TV, open Netflix and select <b>Sign in</b>.
                </li>
                <li>Scan the QR code using your phone.</li>
                <li>Follow the steps on your phone.</li>
              </ol>
              <p className="note">
                <b>NOTE:</b> If you don’t see a code, use your remote.
              </p>
            </div>
          )}

         
          <div className="accordion" onClick={() => toggle("browser")}>
            <span>{open === "browser" ? "▼" : "▶"}</span>
            Use a web browser to sign in
          </div>

          {open === "browser" && (
            <div className="accordion-content">
              <img src="/browser.png" alt="Browser" className="qr-image" />
              <ol>
                <li>
                  On your TV, select <b>Sign in</b>.
                </li>
                <li>
                  On another device, go to <b>netflix.com/tv2</b>.
                </li>
                <li>Follow the steps to sign in.</li>
              </ol>
              <p className="note">
                <b>NOTE:</b> If no code appears, use your remote.
              </p>
            </div>
          )}

         
          <div className="accordion" onClick={() => toggle("remote")}>
            <span>{open === "remote" ? "▼" : "▶"}</span>
            Use your remote to sign in
          </div>

          {open === "remote" && (
            <div className="accordion-content">
              <ol>
                <li>
                  Open Netflix on your TV and select <b>Sign in</b>.
                </li>
                <li>
                  Select <b>Use Remote</b>.
                </li>
                <li>Enter your email and password.</li>
                <li>
                  Choose <b>Send Sign-In Link</b> or <b>Use Password</b>.
                </li>
              </ol>

              <p className="note">
                <b>NOTE:</b> Some TVs may not support Sign-In Link.
              </p>
            </div>
          )}
          <h2>Phone or tablet</h2>
          <p>
            Sign in to the mobile app on an Android phone or tablet, iPhone, or
            iPad.
          </p>
          <div className="accordion" onClick={() => toggle("signin")}>
            <span>{open === "signin" ? "▼" : "▶"}</span>
            use a sign-in code to sign-in
          </div>
          {open === "signin" && (
            <div className="accordion-content">
              <ol>
                <li>
                  On your mobile phone or tablet, open Netflix and select Sign
                  In.
                </li>
                <li>
                  Enter your email address or phone number and select Continue.
                </li>
                <li>
                  Enter the 4-digit code sent to you by email or text message on
                  your device. The code will expire in 15 minutes.
                </li>
                If you are having trouble getting or using a sign-in code, these
                steps can help fix common issues. You can also follow the
                instructions below to sign in with a password instead.
              </ol>
            </div>
          )}

          <div className="accordion" onClick={() => toggle("password")}>
            <span>{open === "password" ? "▼" : "▶"}</span>
            use your password to sign-in
          </div>
          {open === "password" && (
            <div className="accordion-content">
              <ol>
                <li>
                  On your mobile phone or tablet, open Netflix and select Sign In.
                </li>
                <li>
                  Enter your email address or phone number and select Continue.
                </li>
                <li>
                  Select Get Help to expand the menu.
                </li>
                <li>Select Use password instead.</li>
                <li>Enter your account password and select Sign In.</li>
              </ol>
              <p className="note">
                <b>NOTE:</b> A sign-in code will still be sent by email or text message, even if you choose to sign in with a password.
              </p>
            </div>
            
          )}
           <h2>Computer or web browser</h2>
          <p>
            Sign in on the Netflix website or the Netflix app for Windows 10 and later.
          </p>
          <div className="accordion" onClick={() => toggle("code")}>
            <span>{open === "code" ? "▼" : "▶"}</span>
            use sign-in code to sign-in
          </div>
          {open === "code" && (
            <div className="accordion-content">
              <ol>
                <li>
                  On a web browser, go to netflix.com/login or open Netflix on a Windows computer or tablet​.
                </li>
                <li>
                  Enter your email address or phone number and click Continue.
                </li>
                <li>
                  Enter the 4-digit code sent to you by email or text message on your device. The code will expire in 15 minutes.
                </li>
                
              </ol>
              <p>If you are having trouble getting or using a sign-in code, these steps can fix common issues. You can also follow the instructions below to sign in with a password instead.</p>
            </div>
            
          )}
<div className="accordion" onClick={() => toggle("pass")}>
            <span>{open === "pass" ? "▼" : "▶"}</span>
            use sign-in code to sign-in
          </div>
          {open === "pass" && (
            <div className="accordion-content">
              <ol>
                <li>
                  On a web browser, go to netflix.com/login or open Netflix on a Windows computer or tablet.
                </li>
                <li>
                 Enter your email address or phone number and click Continue.
                </li>
                <li>
                Click Use password instead.
                </li>
                <li>
Enter your account password and click Sign In.

                </li>
                
              </ol>
              <p className="note">
                <b>NOTE:</b> A sign-in code will still be sent by email or text message, even if you choose to sign in with a password.
              </p>
            </div>
            
          )}
          <hr></hr>
          <p> Was This article useful?</p>
        <a href="#"> Yes</a>
        <a href="#">No</a>
        </div>
        

       
       <aside className="help-sidebar">
  <h3>Related Articles</h3>

  <ul className="related-list">
    <li>
      <span className="doc-icon">📄</span>
      <a href="#">Billing and Payments</a>
    </li>
    <li>
      <span className="doc-icon">📄</span>
      <a href="#">How to download titles to watch offline</a>
    </li>
    <li>
      <span className="doc-icon">📄</span>
      <a href="#">How to create, edit, or delete profiles</a>
    </li>
    <li>
      <span className="doc-icon">📄</span>
      <a href="#">Netflix isn't working</a>
    </li>
    <li>
      <span className="doc-icon">📄</span>
      <a href="#">How to search and browse Netflix</a>
    </li>
  </ul>
</aside>

      </div>

      <footer className="help-footer">
        <div className="footer-top">
          <p>Need more help?</p>
          <button className="contact-btn">Contact Us</button>
        </div>

        <hr />

        <select className="language-select">
  <option>Arabic</option>
  <option>Chinese (Simplified)</option>
  <option>Chinese (Traditional)</option>
  <option>Croatian</option>
  <option>Czech</option>
  <option>Danish</option>
  <option>Dutch</option>
  <option selected>English</option>
  <option>Filipino</option>
  <option>Finnish</option>
  <option>French</option>
  <option>French (Canada)</option>
  <option>German</option>
  <option>Greek</option>
  <option>Hebrew</option>
  <option>Hindi</option>
  <option>Hungarian</option>
  <option>Indonesian</option>
  <option>Italian</option>
  <option>Japanese</option>
  <option>Korean</option>
  <option>Malay</option>
  <option>Norwegian</option>
  <option>Polish</option>
  <option>Portuguese</option>
  <option>Romanian</option>
  <option>Russian</option>
  <option>Spanish</option>
  <option>Swedish</option>
  <option>Thai</option>
  <option>Turkish</option>
  <option>Ukrainian</option>
  <option>Vietnamese</option>
</select>


        <div className="footer-links">
          <span>Terms of Use</span>
          <span>Privacy</span>
          <span>Cookie Preferences</span>
          <span>Corporate Information</span>
        </div>
      </footer>
    </div>
  );
}

export default Learn;
