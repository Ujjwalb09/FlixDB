import React, { useEffect, useState } from "react";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { asyncLoadSeason, removeSeason } from "../store/actions/seasonAction";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./Loading";
import TrendingCards from "./templates/TrendingCards";
import Topnav from "./templates/Topnav";
import NoImageFound from "../../public/noImage.jpg";

const CircularProgress = ({ percentage }) => {
  const circleWidth = 60;
  const radius = 26;
  const dashArray = radius * Math.PI * 2;
  const dashOffset = dashArray - (dashArray * percentage) / 100;

  return (
    <span className="hover:scale-105">
      <svg
        width={circleWidth}
        height={circleWidth}
        viewBox={`0 0 ${circleWidth} ${circleWidth}`}
      >
        <circle
          cx={circleWidth / 2}
          cy={circleWidth / 2}
          strokeWidth="4"
          r={radius}
          className="fill-[#081c22] stroke-[#081c22]"
        />
        <circle
          cx={circleWidth / 2}
          cy={circleWidth / 2}
          strokeWidth="4"
          r={radius}
          className="fill-none stroke-green-500"
          style={{
            strokeDasharray: dashArray,
            strokeDashoffset: dashOffset,
            strokeLinecap: "round",
            transformOrigin: "50% 50%",
            transform: "rotate(-90deg)",
          }}
        />
        <text
          x="50%"
          y="50%"
          dy="0.3em"
          textAnchor="middle"
          className="fill-white text-[16px] font-bold"
        >
          {`${percentage}%`}
        </text>
      </svg>
    </span>
  );
};

const SeasonDetails = () => {
  const { season, seriesId, showName } = useParams();
  const dispatch = useDispatch();
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { info } = useSelector((state) => state.season);

  // console.log(info);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    dispatch(asyncLoadSeason(seriesId, season));

    return () => dispatch(removeSeason());
  }, [seriesId, season]);

  return info ? (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.8), rgba(0,0,0,.7), rgba(0,0,0,.8)), url(https://image.tmdb.org/t/p/original/${
          info.details.backdrop_path ||
          info.details.poster_path ||
          info.details.profile_path
        })`,
        backgroundPosition: "top 5% left 50%",
        backgroundSize: "cover",
      }}
      className="relative w-screen h-[205vh] px-[10%]"
    >
      {/* Search bar and logo */}
      <div
        className={`fixed top-0 left-0 w-full z-10 px-[5%] flex items-center justify-between h-16 py-5 transition-all duration-300 ${
          isScrolled ? "bg-black bg-opacity-75" : "bg-black bg-opacity-10"
        }`}
      >
        <h1 className="flex text-2xl font-semibold text-zinc-400">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#E9C46A] ri-arrow-left-line mr-5"
          ></i>{" "}
          <Link to="/">
            <i className="text-[#E9C46A] ri-movie-fill mr-2"></i>
            <span
              onClick={() => navigate("/")}
              className=" text-[#E7F0DC] mr-2"
            >
              Flix<span className="text-[#E9C46A]">DB</span>
            </span>
          </Link>
        </h1>
        <div className="flex items-center w-[80%]">
          <div className="w-[90%]">
            <Topnav />
          </div>
        </div>
      </div>

      {/* {part 2 poster and details} */}
      <div className="w-full flex mt-32">
        <img
          className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[50vh] object-fit w-[20%]"
          src={
            info.details.poster_path || info.details.backdrop_path
              ? `https://image.tmdb.org/t/p/original/${
                  info.details.poster_path || info.details.backdrop_path
                }`
              : NoImageFound
          }
          alt={""}
        />

        <div className="content ml-[3%] text-white">
          <h1 className="text-5xl font-black text-white ">
            {showName.split("-").join(" ")}{" "}
            <small className="text-2xl font-bold text-zinc-300">
              Season {season}
            </small>
          </h1>

          <div className="mt-1 mb-5 flex text-white items-center gap-x-1">
            <CircularProgress
              percentage={(info.details.vote_average * 10).toFixed(0)}
            />
            <div className="text-[#E9C46A] flex gap-2">
              {info.details.air_date && <span className="text-xl ml-3">•</span>}
              <h1>{info.details.air_date}</h1>
            </div>
          </div>

          {info.details.overview && (
            <h1 className="mb-3 text-2xl mt-5">Overview</h1>
          )}
          <p className="mb-7">{info.details.overview}</p>

          {info.videos && (
            <Link
              to={`${pathname}/trailer`}
              className="px-3 py-2 text-sm rounded-full font-semibold bg-[#E9C46A] text-white tracking-tight hover:bg-[#AF9350] duration-200 inline-flex items-center justify-center"
            >
              <i className="ri-play-fill text-lg"></i>
              Play Trailer
            </Link>
          )}
        </div>
      </div>

      {/* Part 4 episodes
      {info.details.seasons.length > 0 && (
        <div>
          <hr className="border-t border-gray-500 opacity-50 my-4 mx-16 mt-10" />

          <h1 className="text-3xl font-bold text-white mt-10 pl-5">Seasons</h1>
          <TrendingCards
            data={info.details.seasons}
            showName={info.details.name}
          />
        </div>
      )} */}

      {/* Part 5 recommendations and similar*/}
      {/* <hr className="border-t border-gray-500 opacity-50 my-4 mx-16 mt-10" />

      <h1 className="text-3xl font-bold text-white mt-10 pl-5">
        {info.recommendations.length > 0
          ? "Recommendations"
          : info.similar.length > 0
          ? "Similar"
          : ""}
      </h1>
      <TrendingCards
        data={
          info.recommendations.length > 0 ? info.recommendations : info.similar
        }
      /> */}

      <Outlet />
    </div>
  ) : (
    <Loading />
  );
};

export default SeasonDetails;
