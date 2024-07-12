import React, { useState } from "react";
import { Link } from "react-router-dom";
import CircularProgress from "./CircularProgress";

const Cards = ({ data }) => {
  console.log(data);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="flex flex-wrap w-full h-full px-[5%] bg-[#1F1E24] mt-12">
      {data.map((d, i) => (
        <Link
          className="relative w-[250px] mr-[5%] mb-[5%] hover:scale-105 transition-transform duration-300 ml-16"
          key={i}
          onMouseEnter={() => setHoveredIndex(i)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <div className="relative">
            <img
              className="w-full h-[300px] object-cover rounded-lg"
              src={`https://image.tmdb.org/t/p/original/${
                d.backdrop_path || d.poster_path || d.profile_path
              }`}
              alt={d.name || d.title || d.original_name || d.original_title}
            />
            {d.vote_average && (
              <CircularProgress percentage={(d.vote_average * 10).toFixed(0)} />
            )}
          </div>
          <div className="mt-3">
            <h1 className="text-base text-white font-semibold line-clamp-2">
              {d.name || d.title || d.original_name || d.original_title}
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              {d.release_date || d.first_air_date
                ? new Date(
                    d.release_date || d.first_air_date
                  ).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                : ""}
            </p>
          </div>
          {hoveredIndex === i && (
            <div className="absolute z-20 bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-black bg-opacity-80 text-white text-sm rounded-md whitespace-nowrap">
              {d.name || d.title || d.original_name || d.original_title}
            </div>
          )}
        </Link>
      ))}
    </div>
  );
};

export default Cards;
