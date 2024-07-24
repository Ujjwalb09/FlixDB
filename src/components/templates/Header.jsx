import React from "react";
import { Link } from "react-router-dom";

const Header = ({ data }) => {
  return (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.2), rgba(0,0,0,.5), rgba(0,0,0,.8)), url(https://image.tmdb.org/t/p/original/${
          data.backdrop_path || data.poster_path || data.profile_path
        })`,
        backgroundPosition: "top 5%",
        backgroundSize: "cover",
      }}
      className="w-full h-[55vh] flex flex-col justify-end pt-[10%] pl-[5%] pb-[3%] items-start"
    >
      <h1 className="w-[70%] text-5xl font-black text-white">
        {data.name || data.title || data.original_name || data.original_title}
      </h1>
      <p className="w-[50%] mt-3 mb-3 text-white">
        {data.overview.slice(0, 200)}...
        <Link
          to={
            data.media_type == "movie"
              ? `/movies/details/${data.id}`
              : `/tv_shows/details/${data.id}`
          }
          className="text-blue-400"
        >
          {" "}
          more
        </Link>
      </p>
      <p className="text-white">
        <i className="text-[#E9C46A] ri-megaphone-fill"></i>{" "}
        {data.release_date || data.first_air_date}
        <i className="text-[#E9C46A] ml-3 ri-album-fill"></i>{" "}
        {data.media_type.toUpperCase()}
        <i class="ri-star-fill text-[#E9C46A] ml-3"></i>{" "}
        {Math.floor(data.popularity)}
      </p>
      <Link
        to={`/${data.media_type == "movie" ? "movies" : "tv_shows"}/details/${
          data.id
        }/trailer`}
        className="mt-5 px-3 py-2 text-sm rounded-full font-semibold bg-[#E9C46A] text-white tracking-tight hover:bg-[#AF9350] duration-200 inline-flex items-center justify-center"
      >
        <i class="ri-play-fill text-lg"></i>
        Play Trailer
      </Link>
    </div>
  );
};

export default Header;
