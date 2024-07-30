import axios from "../utils/axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";
import Cards from "./templates/Cards";
import Topnav from "./templates/Topnav";
import Dropdown from "./templates/Dropdown";

const TvShows = () => {
  document.title = "FlixDB | Tv Shows ";
  const navigate = useNavigate();

  const [category, setCategory] = useState("airing_today");
  const [tvShowData, setTvShowData] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  const getTvShow = async () => {
    const { data } = await axios.get(`tv/${category}?page=${page}`);

    if (data.results.length > 0) {
      setTvShowData((prevState) => [...prevState, ...data.results]);
      setPage(page + 1);
    } else {
      setHasMore(false);
    }
  };

  const refreshHandler = () => {
    if (tvShowData.length === 0) {
      getTvShow();
    } else {
      setPage(1);
      setTvShowData([]);
      getTvShow();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);

  useEffect(() => {
    const handleScroll = () => {
      const scroll = window.scrollY;

      if (scroll > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return tvShowData.length > 0 ? (
    <div className="w-screen h-full">
      <div
        className={`fixed top-0 left-0 w-full z-10 px-[5%] flex items-center justify-between h-16 py-5 transition-all duration-300 ${
          isScrolled ? "bg-black bg-opacity-75" : "bg-black"
        }`}
      >
        <h1 className="flex text-2xl font-semibold text-zinc-400">
          <i
            onClick={() => navigate("/")}
            className="hover:text-[#E9C46A] ri-arrow-left-line mr-5 hover:scale-110"
          ></i>{" "}
          <Link to="/">
            <i className="text-[#E9C46A] ri-movie-fill mr-2"></i>
            <span className=" text-[#E7F0DC] mr-2">
              Flix<span className="text-[#E9C46A]">DB</span>
            </span>
          </Link>{" "}
          {" | "}
          Tv Shows
        </h1>
        <div className="flex items-center w-[80%]">
          <div className="w-[90%]">
            <Topnav />
          </div>
          <Dropdown
            value={category}
            title="Category"
            options={["on_the_air", "popular", "top_rated", "airing_today"]}
            func={(e) => setCategory(e.target.value)}
          />
        </div>
      </div>
      <div className="pt-20">
        <InfiniteScroll
          dataLength={tvShowData.length}
          next={getTvShow}
          hasMore={hasMore}
          loader={<h1>Loading...</h1>}
        >
          <Cards data={tvShowData} title="tv_shows" />
        </InfiniteScroll>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default TvShows;
