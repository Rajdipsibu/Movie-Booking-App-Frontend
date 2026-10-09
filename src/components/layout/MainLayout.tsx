import { Outlet } from "react-router-dom";
import Navbar from "../common/Navbar";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main className="pt-1">
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;