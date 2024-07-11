import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "./templates/Topnav";
import Dropdown from "./templates/Dropdown";
import axios from "../utils/axios";

const Trending = () => {
  const navigate = useNavigate();

  const [category, setCategory] = useState("all");
  const [duration, setDuration] = useState("week");
  const [trendingData, setTrendingData] = useState(null);

  const getTrendingData = async () => {
    const { data } = await axios.get(`/trending/${category}/${duration}`);

    setTrendingData(data.results);
  };

  useEffect(() => {
    getTrendingData();
  }, [category, duration]);

  console.log(trendingData);

  return (
    <div className="px-[3%] w-screen h-screen">
      <div className="w-full flex items-center justify-between">
        <h1 className=" text-2xl font-semibold text-zinc-400">
          <i
            onClick={() => navigate("/")}
            className="hover:text-[#E9C46A] ri-arrow-left-line"
          ></i>{" "}
          Trending
        </h1>
        <div className="flex items-center w-[80%]">
          <div className="w-[90%]">
            <Topnav />
          </div>
          <Dropdown
            title="Category"
            options={["movie", "tv", "all"]}
            func={(e) => setCategory(e.target.value)}
          />
          <div className="w-[2%]"></div>
          <Dropdown
            title="Duration"
            options={["week", "day"]}
            func={(e) => setDuration(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default Trending;
