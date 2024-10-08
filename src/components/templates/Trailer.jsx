import React from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import NotFound from "../NotFound";

const Trailer = () => {
  const { pathname } = useLocation();

  const path = pathname.split("/");
  console.log(path);
  console.log(pathname);

  const navigate = useNavigate();

  const { info } =
    path[1] === "movies"
      ? useSelector((state) => state.movie)
      : path.includes("tv_shows") &&
        pathname.includes("season") &&
        pathname.includes("episode")
      ? useSelector((state) => state.episode)
      : path.includes("tv_shows") && pathname.includes("season")
      ? useSelector((state) => state.season)
      : useSelector((state) => state.tv);

  console.log(info);

  return (
    <div className="bg-[rgba(0,0,0,.7)] absolute z-[100] top-0 left-0 w-screen h-screen flex items-center justify-center">
      <Link
        onClick={() => navigate(-1)}
        className="hover:text-[#E9C46A] ri-close-line mr-5 absolute text-2xl text-white left-[5%] top-[5%] hover:scale-110"
      >
        Close
      </Link>{" "}
      {pathname.includes("episode") ? (
        info.videos ? (
          <ReactPlayer
            controls={true}
            height={720}
            width={1280}
            url={`https://www.youtube.com/watch?v=${
              info.videos[parseInt(path[path.length - 1])].key
            }`}
          />
        ) : (
          <NotFound />
        )
      ) : info.videos ? (
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
