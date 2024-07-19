import React from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const Trailer = () => {
  const { pathname } = useLocation();

  const path = pathname.split("/")[1];
  const navigate = useNavigate();

  const { info } =
    path === "movies"
      ? useSelector((state) => state.movie)
      : useSelector((state) => state.tv);

  return (
    <div
      onClick={() => navigate(-1)}
      className="bg-[rgba(0,0,0,.8)] absolute z-[100] top-0 left-0 w-screen h-screen flex items-center justify-center"
    >
      <ReactPlayer
        controls={true}
        url={`https://www.youtube.com/watch?v=${info.videos.key}`}
      />
    </div>
  );
};

export default Trailer;

//https://www.youtube.com/watch?v=6_AMSITikqKiM
