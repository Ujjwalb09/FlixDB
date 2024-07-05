import React, { useEffect, useState } from "react";
import Sidenav from "./templates/Sidenav";
import Topnav from "./templates/Topnav";
import Header from "./templates/Header";
import axios from "../utils/axios";

const Home = () => {
  document.title = "FlixDB | Homepage";

  const [headerData, setHeaderData] = useState(null);

  const getHeaderData = async () => {
    const { data } = await axios.get("/trending/all/day");

    let randomData =
      data.results[Math.floor(Math.random() * data.results.length)];

    setHeaderData(randomData);
  };

  useEffect(() => {
    !headerData && getHeaderData();
  }, []);
  return headerData ? (
    <>
      <Sidenav />
      <div className="w-[80%] h-full">
        <Topnav />
        <Header data={headerData} />
      </div>
    </>
  ) : (
    <h1>Loading....</h1>
  );
};

export default Home;
