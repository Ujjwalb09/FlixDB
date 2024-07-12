import axios from "../utils/axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";
import Cards from "./templates/Cards";
import Topnav from "./templates/Topnav";
import Dropdown from "./templates/Dropdown";

const Movies = () => {
  document.title = "FlixDB | Movies ";
  const navigate = useNavigate();

  const [category, setCategory] = useState("now_playing");
  const [movieData, setMovieData] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const getMovie = async () => {
    const { data } = await axios.get(`movie/${category}?page=${page}`);

    if (data.results.length > 0) {
      setMovieData((prevState) => [...prevState, ...data.results]);
      setPage(page + 1);
    } else {
      setHasMore(false);
    }
  };

  const refreshHandler = () => {
    if (movieData.length === 0) {
      getMovie();
    } else {
      setPage(1);
      setMovieData([]);
      getMovie();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);

  return movieData.length > 0 ? (
    <div className="w-screen h-screen">
      <div className="fixed top-0 left-0 w-full bg-black z-10 px-[5%] flex items-center justify-between h-16">
        <h1 className="flex text-2xl font-semibold text-zinc-400">
          <i
            onClick={() => navigate("/")}
            className="hover:text-[#E9C46A] ri-arrow-left-line mr-5"
          ></i>{" "}
          <Link to="/">
            <i className="text-[#E9C46A] ri-tv-fill mr-2"></i>
            <span className=" text-[#E7F0DC] mr-2">
              Flix<span className="text-[#E9C46A]">DB</span>
            </span>
          </Link>{" "}
          {" | "}
          Movies
        </h1>
        <div className="flex items-center w-[80%]">
          <div className="w-[90%]">
            <Topnav />
          </div>
          <Dropdown
            value={category}
            title="Category"
            options={["popular", "top_rated", "upcoming", "now_playing"]}
            func={(e) => setCategory(e.target.value)}
          />
        </div>
      </div>

      <div className="pt-20">
        <InfiniteScroll
          dataLength={movieData.length}
          next={getMovie}
          hasMore={hasMore}
          loader={<h1>Loading...</h1>}
        >
          <Cards data={movieData} title={category} />
        </InfiniteScroll>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Movies;
