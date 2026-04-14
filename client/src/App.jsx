import { BrowserRouter, Routes, Route } from "react-router-dom";
import Adminlog from "./Adminlog";
import Signin from "./Signin";
import Home from "./Home";
import Games from "./Games";
import Layout from "./Layout";
import Shows from "./Shows";
import Movies from "./Movies";
import Forgot from "./Forgotmail";
import Learn from "./learn";
import Signup from "./Signup";
import Dash from "./Admindash";
import Addproduct from "./Addproduct";
import ViewProducts from "./View Products";
import Player from "./Player";
//import Otp from "./Otp";
import Subscription from "./Subscription";
import Plan from "./Planform";
import ViewScription  from "./ViewSubscription";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signin />} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/adminlog" element={<Adminlog />} />
        <Route path="/admindash" element={<Dash />} />
        <Route path="/addmovies" element={<Addproduct />} />
        <Route path="/view" element={<ViewProducts />} />
        <Route path="/edit/:id" element={<Addproduct />} />
        <Route path="/delete/:id" element={<ViewProducts />} />
        <Route path="/player/:id" element={<Player />} />
      {/*<Route path="/otp" element={<Otp />} />*/}
       
        <Route path="/subscribe" element={<Subscription />} />
        <Route path="/plan" element={<Plan />} />
        
        <Route path="/subview" element={<ViewScription/>}/>

        <Route element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/shows" element={<Shows />} />
          <Route path="/games" element={<Games />} />
          <Route path="/movies" element={<Movies />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
