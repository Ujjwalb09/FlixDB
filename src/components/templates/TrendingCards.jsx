import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CircularProgress from "./CircularProgress";
import noImageFound from "/noImage.jpg";
import { motion, useAnimation } from "framer-motion";

const TrendingCards = ({
  data,
  showName = null,
  seriesId,
  title,
  animated = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimation();

  const encodeForUrl = (str) => {
    return encodeURIComponent(str).replace(/%20/g, "-");
  };

  const renderCards = (data, seasonIndex) => {
    return data.map((d, i) => {
      if (d.name === "Specials") {
        return null;
      }
      const path = !showName
        ? !d.media_type
          ? `/${title}/details/${d.id}`
          : d.media_type === "movie"
          ? `/movies/details/${d.id}`
          : `/tv_shows/details/${d.id}`
        : `/tv_shows/${seriesId}/${encodeForUrl(
            showName
          )}/season/${seasonIndex}`;
      seasonIndex++;
      return (
        <Link
          to={path}
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
              <CircularProgress percentage={(d.vote_average * 10).toFixed(0)} />
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
      );
    });
  };

  useEffect(() => {
    controls.start("animate");
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
    controls.stop();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    controls.start("animate");
  };

  if (animated) {
    const cardWidth = 15; // percentage width of each card
    const gap = 5; // gap between cards in percentage
    const totalWidth = data.length * (cardWidth + gap);

    return (
      <div
        className={`w-full ${
          isHovered ? "overflow-x-auto" : "overflow-hidden"
        } px-5 pt-5 mb-5`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          className="flex"
          animate={controls}
          initial={{ x: "0%" }}
          variants={{
            animate: {
              x: [`0%`, `-${totalWidth}%`],
              transition: {
                x: {
                  repeat: Infinity,
                  duration: 60,
                  ease: "linear",
                },
              },
            },
          }}
        >
          {renderCards(data, 1)}
          {renderCards(data, 1)}
        </motion.div>
      </div>
    );
  } else {
    return (
      <div className="w-full flex overflow-y-hidden px-5 pt-5 mb-5">
        {renderCards(data, 1)}
      </div>
    );
  }
};

export default TrendingCards;
