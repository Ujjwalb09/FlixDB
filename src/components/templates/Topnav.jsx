import React, { useState } from "react";
import { Link } from "react-router-dom";

const Topnav = () => {
  const [query, setquery] = useState("");
  return (
    <div className="max-w-screen-md h-[10vh] flex justify-start items-center relative mx-auto ">
      <i
        class="text-zinc-400 text-3xl 
      ri-search-line"
      ></i>
      <input
        onChange={(e) => setquery(e.target.value)}
        value={query}
        className="w-[68%] text-zinc-200 mx-10 p-5 text-xl outline-none border-none bg-transparent"
        type="text"
        placeholder="Search"
      />

      {query.length > 0 && (
        <i
          onClick={() => setquery("")}
          class="text-zinc-400 text-3xl ri-close-line"
        ></i>
      )}

      <div className="search-result w-[85%] absolute max-h-[50vh] bg-zinc-200 top-[90%] overflow-auto rounded">
        {/* <Link className="text-zinc-600 font-semibold p-10 w-full flex justify-start items-center border-b-2 border-zinc-100 hover:text-black hover:bg-zinc-300 duration-300">
          <img src="" alt="" />
          <span>Hello</span>
        </Link> */}
      </div>
    </div>
  );
};

export default Topnav;

//time stamp 51:26 for top nav width if give issues
