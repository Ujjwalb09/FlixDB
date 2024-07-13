import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import LocomotiveScroll from "locomotive-scroll";
import Loading from "./components/Loading";
import Trending from "./components/Trending";
import Popular from "./components/Popular";
import Movies from "./components/Movies";
import TvShows from "./components/TvShows";
import People from "./components/People";
import MovieDetails from "./components/MovieDetails";
import TvShowDetails from "./components/TvShowDetails";
import PeopleDetails from "./components/PeopleDetails";

const App = () => {
  // const locomotiveScroll = new LocomotiveScroll();
  return (
    <div className="bg-[#1F1E24] w-screen h-screen flex">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/movie/details/:id" element={<MovieDetails />} />
        <Route path="/movie" element={<Movies />}></Route>

        <Route path="/tv" element={<TvShows />}></Route>
        <Route path="/tv/details/:id" element={<TvShowDetails />} />
        <Route path="/people" element={<People />}>
          <Route path="/people/details/:id" element={<PeopleDetails />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
