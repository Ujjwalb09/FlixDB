import React from "react";
import { Link } from "react-router-dom";

const Cards = ({ data }) => {
  return (
    <div className="flex flex-wrap w-full h-full p-[5%] bg-[#1F1E24]">
      {data.map((d, i) => (
        <Link className="w-[25vh] mr-[5%] mb-[5%] hover:scale-105" key={i}>
          <img
            className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[40vh] object-cover"
            src={`https://image.tmdb.org/t/p/original/${
              d.backdrop_path || d.poster_path || d.profile_path
            }`}
          />
          <h1 className="text-2xl text-zinc-300 mt-3 font-semibold">
            {d.name || d.title || d.original_name || d.original_title}
          </h1>
        </Link>
      ))}
    </div>
  );
};

export default Cards;
