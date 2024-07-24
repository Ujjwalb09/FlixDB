import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Topnav from "./templates/Topnav";
import Dropdown from "./templates/Dropdown";
import axios from "../utils/axios";
import Cards from "./templates/Cards";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";

const Trending = () => {
  const navigate = useNavigate();

  const [category, setCategory] = useState("all");
  const [duration, setDuration] = useState("week");
  const [trendingData, setTrendingData] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  document.title = "FlixDB | Trending ";

  const getTrendingData = async () => {
    const { data } = await axios.get(
      `/trending/${category}/${duration}?page=${page}`
    );

    if (data.results.length > 0) {
      setTrendingData((prevState) => [...prevState, ...data.results]);
      setPage(page + 1);
    } else {
      setHasMore(false);
    }

    console.log(data);

    // setTrendingData(data.results);
  };

  const refreshHandler = () => {
    if (trendingData.length === 0) {
      getTrendingData();
    } else {
      setPage(1);
      setTrendingData([]);
      getTrendingData();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category, duration]);

  useEffect(() => {
    const handleScroll = () => {
      const scroll = window.scrollY;
      console.log(scroll);
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

  return trendingData.length > 0 ? (
    <div className="w-screen h-screen">
      <div
        className={`fixed top-0 left-0 w-full z-10 px-[5%] flex items-center justify-between h-16 transition-all duration-300 ${
          isScrolled ? "bg-black bg-opacity-75" : "bg-black"
        }`}
      >
        <h1 className="flex text-2xl font-semibold text-zinc-400">
          <i
            onClick={() => navigate("/")}
            className="hover:text-[#E9C46A] ri-arrow-left-line mr-5"
          ></i>{" "}
          <Link to="/">
            <i className="text-[#E9C46A] ri-movie-fill mr-2"></i>
            <span className=" text-[#E7F0DC] mr-2">
              Flix<span className="text-[#E9C46A]">DB</span>
            </span>
          </Link>{" "}
          {" | "}
          Trending
        </h1>
        <div className="flex items-center w-[80%]">
          <div className="w-[90%]">
            <Topnav />
          </div>
          <Dropdown
            value={category}
            title="Category"
            options={["movie", "tv", "all"]}
            func={(e) => setCategory(e.target.value)}
          />
          <div className="w-[2%]"></div>
          <Dropdown
            value={duration}
            title="Duration"
            options={["week", "day"]}
            func={(e) => setDuration(e.target.value)}
          />
        </div>
      </div>

      <div className="pt-20">
        <InfiniteScroll
          dataLength={trendingData.length}
          next={getTrendingData}
          hasMore={hasMore}
          loader={<h1>Loading...</h1>}
        >
          <Cards data={trendingData} />
        </InfiniteScroll>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Trending;
