
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Cards from "./Cards";
function Dash() {

  const navigate = useNavigate();

  return (<>
   
    <div className="grid-container">
    < Sidebar />
    
    <Cards />
    </div>
  
    </>
  );
}

export default Dash;
