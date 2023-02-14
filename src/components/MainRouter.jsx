import { Route, Routes } from "react-router";
import ClassDetail from "../pages/ClassDetail";
import Home from "../pages/Home";
import Schadules from "../pages/Schadules";
import Search from "../pages/Search";
import Welcome from "../pages/Welcome";

const MainRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/home" element={<Home />} />
      <Route path="/class/:id" element={<ClassDetail />} />
      <Route path="/search" element={<Search />} />
      <Route path="/schadule" element={<Schadules />} />
    </Routes>
  );
};

export default MainRouter;
