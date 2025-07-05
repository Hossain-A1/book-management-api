import Footer from "./components/layouts/Footer";
import Navbar from "./components/layouts/Navbar";
import { Outlet } from "react-router";

const App = () => {
  return (
    <div className="wrapper">
      <Navbar />
      <Outlet />
      <Footer/>
    </div>
  );
};

export default App;
