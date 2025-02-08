import Navbar from "../Navbar";
import { Outlet } from "react-router";

const Default = () => {
  return (
    <div className="h-screen">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Default;
