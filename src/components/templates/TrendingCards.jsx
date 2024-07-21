import React from "react";
import { Link } from "react-router-dom";
import CircularProgress from "./CircularProgress";
import noImageFound from "/noImage.jpg";

const TrendingCards = ({ data, showName, seriesId }) => {
  const encodeForUrl = (str) => {
    return encodeURIComponent(str).replace(/%20/g, "-");
  };

  return (
    <div className="w-full flex overflow-y-hidden px-5 pt-5 mb-5">
      {data.map(
        (d, i) =>
          d.name != "Specials" && (
            <Link
              to={
                !showName
                  ? d.media_type == "movie"
                    ? `/movies/details/${d.id}`
                    : `/tv_shows/details/${d.id}`
                  : `/tv_shows/${seriesId}/${encodeForUrl(
                      showName
                    )}/${encodeForUrl(d.name)}`
              }
              className="min-w-[15%] w-[15%] mr-5 mb-5 hover:scale-105 flex flex-col"
              key={i}
            >
              <div className="relative aspect-[2/3] w-full">
                <img
                  className="absolute inset-0 w-full h-full object-cover rounded-lg shadow-2xl"
                  src={
                    d.poster_path || d.backdrop_path || d.profile_path
                      ? `https://image.tmdb.org/t/p/original/${
                          d.poster_path || d.backdrop_path || d.profile_path
                        }`
                      : noImageFound
                  }
                  alt={""}
                />
                {d.vote_average && d.vote_average > 0 ? (
                  <CircularProgress
                    percentage={(d.vote_average * 10).toFixed(0)}
                  />
                ) : (
                  ""
                )}
              </div>
              <div className="mt-3">
                <h1 className="text-base text-white font-semibold line-clamp-2">
                  {d.name || d.title || d.original_name || d.original_title}
                </h1>
                <p className="text-sm text-gray-400 mt-1">
                  {d.release_date || d.first_air_date || d.air_date
                    ? new Date(
                        d.release_date || d.first_air_date || d.air_date
                      ).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    : ""}
                </p>
              </div>
            </Link>
          )
      )}
    </div>
  );
};

export default TrendingCards;
