import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import LocomotiveScroll from "locomotive-scroll";
import Loading from "./components/Loading";
import Trending from "./components/Trending";
import Popular from "./components/Popular";

const App = () => {
  // const locomotiveScroll = new LocomotiveScroll();
  return (
    <div className="bg-[#1F1E24] w-screen h-screen flex">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/popular" element={<Popular />} />
      </Routes>
    </div>
  );
};

export default App;
