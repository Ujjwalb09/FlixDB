import React, { useState } from "react";
import { Link } from "react-router-dom";
import CircularProgress from "./CircularProgress";

const TrendingCards = ({ data, title }) => {
  return (
    <div className="w-[100%] flex overflow-y-hidden px-5 pt-5 mb-5">
      {data.map((d, i) => (
        <Link
          to={
            d.media_type == "movie"
              ? `/movies/details/${d.id}`
              : `/tv_shows/details/${d.id}`
          }
          // to={
          //   !d.media_type
          //     ? `/${path}/details/${"" + d.id}`
          //     : `/${d.media_type}/details/${"" + d.id}`
          // }
          className="min-w-[15%] mr-5 mb-5 hover:scale-105 h-[45vh]"
          key={i}
        >
          <div className="relative">
            <img
              className="w-full h-[300px] object-cover rounded-lg shadow-2xl"
              src={`https://image.tmdb.org/t/p/original/${
                d.poster_path || d.backdrop_path || d.profile_path
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
        </Link>
      ))}
    </div>
  );
};

export default TrendingCards;
