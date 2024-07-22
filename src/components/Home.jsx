import React, { useEffect, useState } from "react";
import Sidenav from "./templates/Sidenav";
import Topnav from "./templates/Topnav";
import Header from "./templates/Header";
import axios from "../utils/axios";
import TrendingCards from "./templates/TrendingCards";
import Dropdown from "./templates/Dropdown";
import Loading from "./Loading";

const Home = () => {
  document.title = "FlixDB | Homepage";

  const [scrolled, setscrolled] = useState(false);
  const [headerData, setHeaderData] = useState(null);
  const [trendingData, setTrendingData] = useState(null);
  const [category, setCategory] = useState("all");

  const getHeaderData = async () => {
    const { data } = await axios.get("/trending/all/day");
    let randomData =
      data.results[Math.floor(Math.random() * data.results.length)];
    setHeaderData(randomData);
  };

  const getTrendingData = async () => {
    const { data } = await axios.get(`/trending/${category}/day`);
    setTrendingData(data.results);
  };

  useEffect(() => {
    !headerData && getHeaderData();
    getTrendingData();
  }, [category]);

  useEffect(() => {
    const handleScroll = () => {
      const scroll = window.scrollY;

      if (scroll > 30) {
        setscrolled(true);
      } else setscrolled(false);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return headerData && trendingData ? (
    <div className="flex overflow-x-hidden">
      <Sidenav />
      <div className="w-[80%] h-screen overflow-x-hidden relative">
        <div
          className={`sticky top-0 z-10 ${
            scrolled ? "bg-black bg-opacity-70" : "bg-black"
          }`}
        >
          <Topnav />
        </div>
        <div className="content-container">
          {/* Add padding-top here */}
          <Header data={headerData} />
          <div className="flex justify-between p-5">
            <h1 className="text-3xl font-semibold text-zinc-400">Trending</h1>
            <Dropdown
              title="Filter"
              options={["tv", "movie", "all"]}
              func={(e) => setCategory(e.target.value)}
            />
          </div>
          <TrendingCards data={trendingData} />
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Home;
