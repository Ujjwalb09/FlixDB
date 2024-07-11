import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "./templates/Topnav";
import Dropdown from "./templates/Dropdown";
import axios from "../utils/axios";
import Cards from "./templates/Cards";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";

const Trending = () => {
  document.title = "FlixDB | Trending";
  const navigate = useNavigate();

  const [category, setCategory] = useState("all");
  const [duration, setDuration] = useState("week");
  const [trendingData, setTrendingData] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

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

  return trendingData.length > 0 ? (
    <div className="w-screen h-screen">
      <div className="px-[5%] w-full flex items-center justify-between">
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

      <InfiniteScroll
        dataLength={trendingData.length}
        next={getTrendingData}
        hasMore={hasMore}
        loader={<h1>Loading...</h1>}
      >
        <Cards data={trendingData} title={category} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default Trending;
