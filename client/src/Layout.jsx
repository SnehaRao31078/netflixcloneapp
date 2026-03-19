import Nav from "./Navbar";
import "./home.css";
import Foot from "./Footer";
import { Outlet } from "react-router-dom";
function Layout() {
  return (
    <div className="layout">
      <Nav />
      <Outlet />
      <Foot />
    </div>
  );
}
export default Layout;