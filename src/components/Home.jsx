import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import Sidenav from "./templates/Sidenav";
import Topnav from "./templates/Topnav";
import Header from "./templates/Header";
import axios from "../utils/axios";
import TrendingCards from "./templates/TrendingCards";
import Dropdown from "./templates/Dropdown";
import Loading from "./Loading";

const Home = () => {
  document.title = "FlixDB | Homepage";

  const [scrolled, setScrolled] = useState(false);
  const [created, setCreated] = useState(false);
  const [headerData, setHeaderData] = useState(null);
  const [trendingData, setTrendingData] = useState(null);
  const [category, setCategory] = useState("all");
  const scrollContainerRef = useRef(null);

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
    getHeaderData();

    const id = setInterval(() => {
      getHeaderData();
    }, 10000);

    return () => clearInterval(id);
  }, [category]);

  useEffect(() => {
    getTrendingData();
  }, [category]);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const scroll = scrollContainerRef.current.scrollTop;
        if (scroll > 10) {
          setScrolled(true);
        } else {
          setScrolled(false);
        }
      }
    };

    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, [created]);

  return headerData && trendingData ? (
    <div className="flex overflow-x-hidden">
      <Sidenav />
      <div
        ref={scrollContainerRef}
        className="w-[80%] h-screen overflow-y-auto overflow-x-hidden relative"
      >
        {!created && setCreated(true)}
        <div
          className={`sticky top-0 z-10 ${
            scrolled ? "bg-black bg-opacity-60" : "bg-black"
          }`}
        >
          <Topnav />
        </div>
        <div className="content-container">
          <Header data={headerData} />
          <div className="flex justify-between p-5">
            <h1 className="text-3xl font-semibold text-zinc-400">Trending</h1>
            <Dropdown
              title="Filter"
              options={["tv", "movie", "all"]}
              func={(e) => setCategory(e.target.value)}
            />
          </div>
          <TrendingCards data={trendingData} animated={true} />
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Home;
