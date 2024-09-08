import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import CircularProgress from "./CircularProgress";
import noImageFound from "/noImage.jpg";
import { motion, useAnimation } from "framer-motion";

const TrendingCards = React.memo(
  ({
    data,
    showName = null,
    seriesId,
    title,
    animated = false,
    speed = 20,
    season,
    episode = false,
  }) => {
    const [isHovered, setIsHovered] = useState(false);
    const controls = useAnimation();

    const encodeForUrl = useCallback((str) => {
      return encodeURIComponent(str).replace(/%20/g, "-");
    }, []);

    const renderCards = useCallback(
      (data, seasonIndex, episodeIndex) => {
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
            : !episode
            ? `/tv_shows/${seriesId}/${encodeForUrl(
                showName
              )}/season/${seasonIndex}`
            : `/tv_shows/${seriesId}/${encodeForUrl(
                showName
              )}/season/${season}/episode/${episodeIndex}`;
          seasonIndex++;
          episodeIndex++;
          return (
            <Link
              to={path}
              className="min-w-[50%] sm:min-w-[33.333%] md:min-w-[25%] lg:min-w-[20%] xl:min-w-[15%] w-[50%] sm:w-[33.333%] md:w-[25%] lg:w-[20%] xl:w-[15%] pr-4 mb-5 hover:scale-105 flex flex-col"
              key={i}
            >
              <div className="relative aspect-[2/3] w-full">
                <img
                  className="absolute inset-0 w-full h-full object-cover rounded-lg shadow-2xl"
                  src={
                    d.poster_path ||
                    d.backdrop_path ||
                    d.profile_path ||
                    d.still_path
                      ? `https://image.tmdb.org/t/p/original/${
                          d.poster_path ||
                          d.backdrop_path ||
                          d.profile_path ||
                          d.still_path
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
                <h1 className="text-sm sm:text-base text-white font-semibold line-clamp-2">
                  {episode
                    ? `Episode ${episodeIndex - 1}: ` +
                      (d.name || d.title || d.original_name || d.original_title)
                    : d.name || d.title || d.original_name || d.original_title}
                </h1>
                <p className="text-xs sm:text-sm text-gray-400 mt-1">
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
      },
      [showName, title, seriesId, episode, season, encodeForUrl]
    );

    useEffect(() => {
      controls.start("animate");
    }, [controls]);

    const handleMouseEnter = useCallback(() => {
      setIsHovered(true);
      controls.stop();
    }, [controls]);

    const handleMouseLeave = useCallback(() => {
      setIsHovered(false);
      controls.start("animate");
    }, [controls]);

    const { cardWidth, gap, totalWidth, duration } = useMemo(() => {
      const cardWidth = 15; // percentage width of each card
      const gap = 5; // gap between cards in percentage
      const totalWidth = data.length * (cardWidth + gap);
      const duration = (totalWidth / 100) * speed;
      return { cardWidth, gap, totalWidth, duration };
    }, [data.length, speed]);

    if (animated) {
      return (
        <div
          className={`w-full ${
            isHovered ? "overflow-x-auto" : "overflow-hidden"
          } px-2 sm:px-4 md:px-5 pt-5 mb-5`}
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
                    duration: duration,
                    ease: "linear",
                  },
                },
              },
            }}
          >
            {renderCards(data, 1, 1)}
            {renderCards(data, 1, 1)}
          </motion.div>
        </div>
      );
    } else {
      return (
        <div className="w-full flex flex-wrap overflow-y-hidden px-2 sm:px-4 md:px-5 pt-5 mb-5">
          {renderCards(data, 1, 1)}
        </div>
      );
    }
  }
);

export default TrendingCards;
