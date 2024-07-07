import React, { useEffect, useState } from "react";
import Sidenav from "./templates/Sidenav";
import Topnav from "./templates/Topnav";
import Header from "./templates/Header";
import axios from "../utils/axios";
import TrendingCards from "./templates/TrendingCards";

const Home = () => {
  document.title = "FlixDB | Homepage";

  const [headerData, setHeaderData] = useState(null);
  const [trendingData, setTrendingData] = useState(null);

  const getHeaderData = async () => {
    const { data } = await axios.get("/trending/all/day");

    let randomData =
      data.results[Math.floor(Math.random() * data.results.length)];

    setHeaderData(randomData);
  };

  const getTrendingData = async () => {
    const { data } = await axios.get("/trending/all/day");

    setTrendingData(data.results);
  };

  useEffect(() => {
    !headerData && getHeaderData();
    !trendingData && getTrendingData();
  }, []);
  return headerData && trendingData ? (
    <>
      <Sidenav />
      <div className="w-[80%] h-full overflow-auto overflow-x-hidden">
        <Topnav />
        <Header data={headerData} />
        <TrendingCards data={trendingData} />
      </div>
    </>
  ) : (
    <h1>Loading....</h1>
  );
};

export default Home;
