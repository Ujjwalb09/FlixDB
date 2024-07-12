import axios from "../utils/axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";
import Cards from "./templates/Cards";
import Topnav from "./templates/Topnav";

const People = () => {
  document.title = "FlixDB | People ";
  const navigate = useNavigate();

  const [peopleData, setPeopleData] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const getPeople = async () => {
    const { data } = await axios.get(`person/popular?page=${page}`);

    if (data.results.length > 0) {
      setPeopleData((prevState) => [...prevState, ...data.results]);
      setPage(page + 1);
    } else {
      setHasMore(false);
    }
  };

  const refreshHandler = () => {
    if (peopleData.length === 0) {
      getPeople();
    } else {
      setPage(1);
      setPeopleData([]);
      getPeople();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, []);

  return peopleData.length > 0 ? (
    <div className="w-screen h-screen">
      <div className="px-[5%] w-full flex items-center justify-between">
        <h1 className=" text-2xl font-semibold text-zinc-400">
          <i
            onClick={() => navigate("/")}
            className="hover:text-[#E9C46A] ri-arrow-left-line"
          ></i>{" "}
          People
        </h1>
        <div className="flex items-center w-[80%]">
          <div className="w-[90%]">
            <Topnav />
          </div>
        </div>
      </div>

      <InfiniteScroll
        dataLength={peopleData.length}
        next={getPeople}
        hasMore={hasMore}
        loader={<h1>Loading...</h1>}
      >
        <Cards data={peopleData} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default People;
