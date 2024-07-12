import axios from "../utils/axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
      <div className="px-[5%] w-full flex items-center justify-between">
        <h1 className=" text-2xl font-semibold text-zinc-400">
          <i
            onClick={() => navigate("/")}
            className="hover:text-[#E9C46A] ri-arrow-left-line"
          ></i>{" "}
          Movies {"|"}{" "}
          <small className="text-zinc-500 text-md">
            {category
              .split("_")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}
          </small>
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

      <InfiniteScroll
        dataLength={movieData.length}
        next={getMovie}
        hasMore={hasMore}
        loader={<h1>Loading...</h1>}
      >
        <Cards data={movieData} title={category} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default Movies;
