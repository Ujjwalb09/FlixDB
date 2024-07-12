import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../../utils/axios";

const Sidenav = () => {
  //E9C46A #6556CD
  return (
    <div className="w-[20%] h-full border-r-2 border-zinc-400 p-10">
      <a href="/">
        <h1 className="text-2xl text-white font-bold">
          <i className="text-[#E9C46A] ri-tv-fill mr-3"></i>

          <span className="text-2xl text-[#E7F0DC]">
            Flix<span className="text-[#E9C46A]">DB</span>
          </span>
        </h1>
      </a>

      <nav className="flex flex-col text-zinc-400 text-xl gap-3">
        <h1 className="text-white font-semibold text-xl mt-10 mb-5">
          New Feeds
        </h1>

        <Link
          to="/trending"
          className="hover:bg-[#E9C46A] hover:text-white rounded-lg duration-200 p-5"
        >
          <i className="ri-fire-fill"></i> Trending
        </Link>
        <Link
          to="/popular"
          className="hover:bg-[#E9C46A] hover:text-white rounded-lg duration-200 p-5"
        >
          <i className="ri-bard-fill"></i> Popular
        </Link>
        <Link className="hover:bg-[#E9C46A] hover:text-white rounded-lg duration-200 p-5">
          <i className="ri-movie-2-fill"></i> Movies
        </Link>
        <Link className="hover:bg-[#E9C46A] hover:text-white rounded-lg duration-200 p-5">
          <i className="ri-tv-2-fill"></i> Tv Shows
        </Link>
        <Link className="hover:bg-[#E9C46A] hover:text-white rounded-lg duration-200 p-5">
          <i className="ri-team-fill"></i> People
        </Link>
      </nav>

      <hr className="border-none h-[1px] bg-zinc-400" />

      <nav className="flex flex-col text-zinc-400 text-xl gap-3">
        <h1 className="text-white font-semibold text-xl mt-10 mb-5">
          Website Information
        </h1>

        <Link className="hover:bg-[#E9C46A] hover:text-white rounded-lg duration-200 p-5">
          <i className="ri-information-fill"></i> About
        </Link>
        <Link className="hover:bg-[#E9C46A] hover:text-white rounded-lg duration-200 p-5">
          <i className="ri-phone-fill"></i> Contact Us
        </Link>
      </nav>
    </div>
  );
};

export default Sidenav;
