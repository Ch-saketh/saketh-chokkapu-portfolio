import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="pt-[96px] sm:pt-[110px] md:pt-[100px] lg:pt-[76px]">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};


export default Layout;
