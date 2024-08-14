import React, { useEffect, useState } from "react";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import {
  asyncLoadEpisode,
  removeEpisode,
} from "../store/actions/episodeAction";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./Loading";
import Topnav from "./templates/Topnav";
import NoImageFound from "../../public/noImage.jpg";
import { removeSeason } from "../store/reducers/seasonSlice";
import TrendingCards from "./templates/TrendingCards";
import { asyncLoadSeason } from "../store/actions/seasonAction";

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

const EpisodeDetails = () => {
  const { season, seriesId, showName, episode } = useParams();
  const dispatch = useDispatch();
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { info } = useSelector((state) => state.episode);

  useEffect(() => {
    dispatch(asyncLoadEpisode(seriesId, season, episode));

    return () => {
      dispatch(removeEpisode());
    };
  }, [episode]);

  useEffect(() => {
    info
      ? (document.title = `S:${season} Ep:${episode} | ${info.details.name}`)
      : "FlixDB";
  }, [info]);

  useEffect(() => {
    dispatch(asyncLoadSeason(seriesId, season));
    return () => dispatch(removeSeason());
  }, [episode]);

  const seasonInfo = useSelector((state) => state.season.info);

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

  return info ? (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.8), rgba(0,0,0,.7), rgba(0,0,0,.8)), url(https://image.tmdb.org/t/p/original/${
          info.details.backdrop_path ||
          info.details.poster_path ||
          info.details.profile_path ||
          info.details.still_path
        })`,
        backgroundPosition: "top 5% left 50%",
        backgroundSize: "cover",
      }}
      className="relative w-screen h-[150vh] px-[10%]"
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
          className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[50vh] object-cover w-[25%]"
          src={
            info.details.poster_path ||
            info.details.backdrop_path ||
            info.details.still_path
              ? `https://image.tmdb.org/t/p/original/${
                  info.details.poster_path ||
                  info.details.backdrop_path ||
                  info.details.still_path
                }`
              : NoImageFound
          }
          alt={""}
        />

        <div className="content ml-[3%] text-white">
          <h1 className="text-5xl font-black text-white ">
            {info.details.name}{" "}
            <small className="text-2xl font-bold text-zinc-300">
              {showName.split("-").join(" ")} S:{season} Ep:{episode}
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
            <div className="text-[#E9C46A] flex gap-2">
              {info.details.runtime && <span className="text-xl ml-3">•</span>}
              <h1>{info.details.runtime} mins</h1>
            </div>
          </div>

          {info.details.overview && (
            <h1 className="mb-3 text-2xl mt-5">Overview</h1>
          )}
          <p className="mb-7">{info.details.overview}</p>

          {info.videos && (
            <div className="flex gap-5">
              {info.videos.length > 1 ? (
                info.videos.map((clip, index) => (
                  <Link
                    to={`${pathname}/trailer/${index}`}
                    className="px-3 py-2 text-sm rounded-lg font-semibold bg-[#E9C46A] text-white tracking-tight hover:bg-[#AF9350] hover:scale-105 duration-200 inline-flex items-center justify-center"
                  >
                    <i className="ri-play-fill text-lg"></i>
                    Clip {index + 1}
                  </Link>
                ))
              ) : (
                <Link
                  to={`${pathname}/trailer`}
                  className="px-3 py-2 text-sm rounded-full font-semibold bg-[#E9C46A] text-white tracking-tight hover:bg-[#AF9350] hover:scale-105 duration-200 inline-flex items-center justify-center"
                >
                  <i className="ri-play-fill text-lg"></i>
                  Clip 1
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
      {/* Part 4 remaining episodes */}
      {seasonInfo && seasonInfo.details.episodes.length > 0 && (
        <div>
          <hr className="border-t border-gray-500 opacity-50 my-4 mx-16 mt-10" />

          <h1 className="text-3xl font-bold text-white mt-10 pl-5">Episodes</h1>
          <TrendingCards
            data={seasonInfo.details.episodes}
            showName={showName}
            seriesId={seriesId}
            season={season}
            animated={seasonInfo.details.episodes.length > 5 && true}
            episode={true}
          />
        </div>
      )}
      <Outlet />
    </div>
  ) : (
    <Loading />
  );
};

export default EpisodeDetails;
