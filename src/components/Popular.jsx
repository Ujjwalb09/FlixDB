import axios from "../utils/axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";
import Cards from "./templates/Cards";
import Topnav from "./templates/Topnav";
import Dropdown from "./templates/Dropdown";

const Popular = () => {
  const navigate = useNavigate();

  const [category, setCategory] = useState("movie");
  const [popularData, setPopularData] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  document.title = "FlixDB | Popular ";
  const getPopularData = async () => {
    const { data } = await axios.get(`${category}/popular?page=${page}`);

    if (data.results.length > 0) {
      setPopularData((prevState) => [...prevState, ...data.results]);
      setPage(page + 1);
    } else {
      setHasMore(false);
    }
  };

  const refreshHandler = () => {
    if (popularData.length === 0) {
      getPopularData();
    } else {
      setPage(1);
      setPopularData([]);
      getPopularData();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);

  return popularData.length > 0 ? (
    <div className="w-screen h-screen">
      <div className="px-[5%] w-full flex items-center justify-between">
        <h1 className=" text-2xl font-semibold text-zinc-400">
          <i
            onClick={() => navigate("/")}
            className="hover:text-[#E9C46A] ri-arrow-left-line"
          ></i>{" "}
          Popular {"|"}{" "}
          <small className="text-zinc-500 text-md">
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </small>
        </h1>
        <div className="flex items-center w-[80%]">
          <div className="w-[90%]">
            <Topnav />
          </div>
          <Dropdown
            value={category}
            title="Category"
            options={["movie", "tv"]}
            func={(e) => setCategory(e.target.value)}
          />
        </div>
      </div>

      <InfiniteScroll
        dataLength={popularData.length}
        next={getPopularData}
        hasMore={hasMore}
        loader={<h1>Loading...</h1>}
      >
        <Cards data={popularData} title={category} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default Popular;
