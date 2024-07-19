import React from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import NotFound from "../NotFound";

const Trailer = () => {
  const { pathname } = useLocation();

  const path = pathname.split("/")[1];
  const navigate = useNavigate();

  const { info } =
    path === "movies"
      ? useSelector((state) => state.movie)
      : useSelector((state) => state.tv);

  return (
    <div className="bg-[rgba(0,0,0,.7)] absolute z-[100] top-0 left-0 w-screen h-screen flex items-center justify-center">
      <Link
        onClick={() => navigate(-1)}
        className="hover:text-[#E9C46A] ri-close-line mr-5 absolute text-2xl text-white left-[5%] top-[5%]"
      >
        Close
      </Link>{" "}
      {info.videos ? (
        <ReactPlayer
          controls={true}
          height={720}
          width={1280}
          url={`https://www.youtube.com/watch?v=${info.videos.key}`}
        />
      ) : (
        <NotFound />
      )}
    </div>
  );
};

export default Trailer;

//https://www.youtube.com/watch?v=6_AMSITikqKiM
