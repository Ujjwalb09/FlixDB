import React from "react";
import { Link } from "react-router-dom";

const TrendingCards = ({ data }) => {
  return (
    <div className="w-[100%] flex overflow-y-hidden p-5 mb-5">
      {data.map((d, i) => (
        <Link
          to={
            d.media_type == "movie"
              ? `/movies/details/${d.id}`
              : `/tv_shows/details/${d.id}`
          }
          key={i}
          className="bg-zinc-900 min-w-[15%] mr-5 mb-5 hover:scale-105"
        >
          <img
            className="w-full h-[55%] object-cover"
            src={`https://image.tmdb.org/t/p/original/${
              d.backdrop_path || d.poster_path || d.profile_path
            }`}
            alt=""
          />

          <div className="text-white p-3 h-[45%]">
            <h1 className="text-lg font-semibold">
              {d.name || d.title || d.original_name || d.original_title}
            </h1>
            <p className="">
              {d.overview.slice(0, 50)}...
              <span className="text-zinc-500"> more</span>
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default TrendingCards;
