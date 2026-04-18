import "./sub.css";
import {Link} from "react-router-dom";
function Subscription()
    {
        return(
            <>
            <p className="logo-signin">NETFLIX</p>
            <h1>Choose the plan that is right for u </h1>
            <p><i className="fa solid fa-check"></i> Watch all u want</p>
             <p><i className="fa solid fa-check"></i>Recommendation just for you</p>
             <p><i className="fa solid fa-check"></i>Change or cancel your plan anytime</p>
             <div className="plan">
             <div className="basic">
                Basic with add
                <h3>Monthly price:<br></br>
                <p className="video">₹199</p>
               </h3>
                <hr></hr>
                <h3 > Video and voice quality<br></br>
               <p className="video">Best</p> 
                </h3>
                <hr></hr>
                 <h3>Resolution</h3>
               <p className="video">4K</p>
               <hr></hr>
       <Link to="/plan?type=basic&price=199">
                <button>Choose Basic plan</button>
            </Link>
             </div>

              <div className="basic">
               Standard
               <h3>Monthly price:<br></br>
               <p className="video">₹499</p></h3>
               <p></p><hr></hr>
               <h3>Voice and Video Quality</h3>
               <p className="video">Great</p>
               <hr></hr>
              <h3>Resolution</h3>
              <p className="video">1080p</p>
              <hr></hr>
               <Link to="/plan?type=standard&price=499"> <button>Choose Standard plan</button></Link>
             </div>


             <div className="basic">
                Premium
                <h3>Monthly price:
                    <br></br>
                    <p className="video">₹799</p>
                </h3>
                <p></p><hr></hr>
                <h3>Video and sound quality</h3>
                <p className="video">Excellent</p>
                <hr/>
                <h3>Resolution</h3>
                <p className="video">1080p</p>
                <hr></hr>
                <Link to="/plan?type=premium&price=799"> <button>Choose Premium plan</button></Link>
             </div>
             </div>
           
 
            </>
        );
    }

export default Subscription;