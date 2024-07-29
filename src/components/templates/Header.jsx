import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Header = ({ data }) => {
  const [key, setKey] = useState(0);

  useEffect(() => {
    setKey((prevKey) => prevKey + 1);
  }, [data]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.3 },
    },
  };

  const childVariants = {
    hidden: { x: "100%", opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
    exit: {
      x: "-100%",
      opacity: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={key}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        style={{
          background: `linear-gradient(rgba(0,0,0,.2), rgba(0,0,0,.5), rgba(0,0,0,.8)), url(https://image.tmdb.org/t/p/original/${
            data.backdrop_path || data.poster_path || data.profile_path
          })`,
          backgroundPosition: "top 5%",
          backgroundSize: "cover",
        }}
        className="w-full h-[55vh] flex flex-col justify-end pt-[10%] pl-[5%] pb-[3%] items-start"
      >
        <motion.h1
          variants={childVariants}
          className="w-[70%] text-5xl font-black text-white"
        >
          {data.name || data.title || data.original_name || data.original_title}
        </motion.h1>
        <motion.p
          variants={childVariants}
          className="w-[50%] mt-3 mb-3 text-white"
        >
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
        </motion.p>
        <motion.p variants={childVariants} className="text-white">
          <i className="text-[#E9C46A] ri-megaphone-fill"></i>{" "}
          {new Date(
            data.release_date || data.first_air_date
          ).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
          <i className="text-[#E9C46A] ml-3 ri-album-fill"></i>{" "}
          {data.media_type.toUpperCase()}
          <i className="ri-star-fill text-[#E9C46A] ml-3"></i>{" "}
          {Math.floor(data.popularity)}
        </motion.p>
        <motion.div variants={childVariants}>
          <Link
            to={`/${
              data.media_type == "movie" ? "movies" : "tv_shows"
            }/details/${data.id}/trailer`}
            className="mt-5 px-3 py-2 text-sm rounded-full font-semibold bg-[#E9C46A] text-white tracking-tight hover:bg-[#AF9350] duration-200 inline-flex items-center justify-center hover:scale-105"
          >
            <i className="ri-play-fill text-lg"></i>
            Play Trailer
          </Link>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Header;
