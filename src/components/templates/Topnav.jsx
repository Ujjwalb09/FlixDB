import axios from "../../utils/axios";
import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import CircularProgress from "./CircularProgress";

const Topnav = () => {
  const [query, setquery] = useState("");
  const [searches, setSearches] = useState([]);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const searchContainerRef = useRef(null);

  const getSearches = async () => {
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      setSearches(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSearches();
  }, [query]);

  const handleClickOutside = (event) => {
    if (
      searchContainerRef.current &&
      !searchContainerRef.current.contains(event.target)
    ) {
      setIsSearchVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={searchContainerRef}
      className="max-w-screen-md h-[8vh] flex justify-start items-center relative mx-auto z-50"
    >
      <i className="text-[#E9C46A] text-3xl ri-search-line"></i>
      <input
        onChange={(e) => {
          setquery(e.target.value);
          setIsSearchVisible(true);
        }}
        value={query}
        className="w-[68%] text-zinc-200 mx-10 p-5 text-xl outline-none border-none bg-transparent"
        type="text"
        placeholder="search"
      />

      {query.length > 0 && (
        <i
          onClick={() => {
            setquery("");
            setIsSearchVisible(false);
          }}
          className="text-zinc-400 text-3xl ri-close-line cursor-pointer"
        ></i>
      )}

      {isSearchVisible && query.length > 0 && searches.length > 0 && (
        <div className="search-result w-[79%] absolute max-h-[50vh] bg-zinc-200 top-[100%] overflow-auto rounded left-[6%] z-50 shadow-lg overflow-x-hidden">
          {searches.map((s, i) => (
            <Link
              to={
                s.media_type == "movie"
                  ? `/movies/details/${s.id}`
                  : s.media_type === "tv"
                  ? `/tv_shows/details/${s.id}`
                  : `/people/details/${s.id}`
              }
              key={i}
              className="text-zinc-600 font-semibold p-10 w-full flex justify-start items-center border-b-2 border-zinc-100 hover:text-black hover:bg-zinc-300 duration-300 hover:scale-105"
            >
              <img
                className="w-[10vh] h-[10vh] object-cover rounded mr-10 shadow-lg"
                src={
                  s.backdrop_path || s.poster_path || s.profile_path
                    ? `https://image.tmdb.org/t/p/original/${
                        s.backdrop_path || s.poster_path || s.profile_path
                      }`
                    : "../../../public/noImage.jpg"
                }
                alt=""
              />
              <span>{s.title || s.name}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Topnav;
