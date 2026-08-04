import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import LightNavbar from "../Light/LightNavbar";
import LightFooter from "../Light/LightFooter";
import { useTheme } from "../../context/ThemeContext";

const Layout: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div
      className={`flex flex-col min-h-screen ${
        theme === "dark"
          ? "bg-[#0B0F17] text-white"
          : "bg-[#F6F5F2] text-[#222222]"
      }`}
    >
      {theme === "dark" ? <Navbar /> : <LightNavbar />}

      <main className="flex-1">
        <Outlet />
      </main>

      {theme === "dark" ? <Footer /> : <LightFooter />}
    </div>
  );
};

export default Layout;
