import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Error404 from "../pages/Error404";
import Layout from "../components/Layout/Layout";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
      </Route>
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
};

export default AppRoutes;
