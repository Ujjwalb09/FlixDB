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
import Trailer from "./components/templates/Trailer";

const App = () => {
  // const locomotiveScroll = new LocomotiveScroll();
  return (
    <div className="bg-[#1F1E24] w-screen h-screen flex">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/popular" element={<Popular />} />

        <Route path="/movies/details/:id" element={<MovieDetails />}>
          <Route
            path="/movies/details/:id/trailer"
            element={<Trailer />}
          ></Route>
        </Route>
        <Route path="/movies" element={<Movies />} />

        <Route path="/tv_shows/details/:id" element={<TvShowDetails />} />
        <Route path="/tv_shows" element={<TvShows />} />

        <Route path="/people/details/:id" element={<PeopleDetails />} />
        <Route path="/people" element={<People />} />
      </Routes>
    </div>
  );
};

export default App;
