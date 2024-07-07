import React from "react";

const TrendingCards = ({ data }) => {
  return (
    <div className="w-full h-[40vh] p-5 overflow-x-auto">
      <div className="mb-5">
        <h1 className="text-3xl font-semibold mb-5 text-zinc-400">Trending</h1>
      </div>
      <div className="w-[100%] flex ">
        {data.map((d, i) => (
          <div key={i} className="text-white w-[15%] mr-5">
            {d.title || d.name || d.original_name || d.original_title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingCards;
