import axios from "../../utils/axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Topnav = () => {
  const [query, setquery] = useState("");
  const [searches, setSearches] = useState([]);

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
  return (
    <div className="max-w-screen-md h-[10vh] flex justify-start items-center relative mx-auto ">
      <i
        className="text-[#E9C46A] text-3xl 
      ri-search-line"
      ></i>
      <input
        onChange={(e) => setquery(e.target.value)}
        value={query}
        className="w-[68%] text-zinc-200 mx-10 p-5 text-xl outline-none border-none bg-transparent"
        type="text"
        placeholder="search"
      />

      {query.length > 0 && (
        <i
          onClick={() => setquery("")}
          className="text-zinc-400 text-3xl ri-close-line"
        ></i>
      )}

      <div className="search-result w-[79%] absolute max-h-[50vh] bg-zinc-200 top-[100%] overflow-auto rounded left-[6%]">
        {searches.map((s, i) => (
          <Link
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
                  : "../../../noImage.jpg"
              }
              alt=""
            />
            <span>{s.title || s.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Topnav;

//time stamp 51:26 for top nav width if give issues
