import React from "react";
import Sidenav from "./templates/Sidenav";

const Home = () => {
  document.title = "SCSDB | Homepage";
  return (
    <>
      <Sidenav />
      <div className="w-[80%] h-full bg-red-200"></div>
    </>
  );
};

export default Home;
