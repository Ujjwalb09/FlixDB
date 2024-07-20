import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { asyncLoadTvShow, removeTvShow } from "../store/actions/tvShowActions";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./Loading";
import TrendingCards from "./templates/TrendingCards";
import Topnav from "./templates/Topnav";

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

const TvShowDetails = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { pathname } = useLocation();
  const { info } = useSelector((state) => state.tv);
  console.log(info);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncLoadTvShow(id));
    return () => dispatch(removeTvShow());
  }, [id]);

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
            <i className="text-[#E9C46A] ri-tv-fill mr-2"></i>
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
          src={`https://image.tmdb.org/t/p/original/${
            info.details.poster_path || info.details.backdrop_path
          }`}
          alt={
            info.details.name ||
            info.details.title ||
            info.details.original_name ||
            info.details.original_title
          }
        />

        <div className="content ml-[3%] text-white">
          <h1 className="text-5xl font-black text-white ">
            {info.details.name ||
              info.details.title ||
              info.details.original_name ||
              info.details.original_title}

            <small className="text-2xl font-bold text-zinc-300">
              ({info.details.first_air_date.split("-")[0]})
            </small>
          </h1>

          <div className="mt-1 mb-5 flex text-white items-center gap-x-1">
            <CircularProgress
              percentage={(info.details.vote_average * 10).toFixed(0)}
            />
            <div className="text-[#E9C46A] flex gap-2">
              <span className="text-xl ml-3">•</span>
              <h1>{info.details.first_air_date}</h1>
              <span className="text-xl ml-3">•</span>
              <h1>{info.details.genres.map((g) => g.name).join(", ")}</h1>
              <span className="text-xl ml-3">•</span>
              <h1>Seasons: {info.details.number_of_seasons}</h1>
              <span className="text-xl ml-3">•</span>
              <h1>Total Episodes: {info.details.number_of_episodes}</h1>
            </div>
          </div>

          <h1 className="text-2xl font-semibold italic text-zinc-200">
            {info.details.tagline}
          </h1>
          <h1 className="mb-3 text-2xl mt-5">Overview</h1>
          <p className="mb-7">{info.details.overview}</p>

          <Link
            to={`${pathname}/trailer`}
            className="px-3 py-2 text-sm rounded-full font-semibold bg-[#E9C46A] text-white tracking-tight hover:bg-[#AF9350] duration-200 inline-flex items-center justify-center"
          >
            <i className="ri-play-fill text-lg"></i>
            Play Trailer
          </Link>
        </div>
      </div>

      {/*part 3 available platforms/watchproviders*/}
      <div className="w-[80%] flex flex-col gap-y-5 mt-10">
        {info.watchProvider && info.watchProvider.flatrate && (
          <div className="flex gap-x-10 items-center text-white font-semibold">
            <h1>Watch Now:</h1>
            {info.watchProvider.flatrate.map((w) => (
              <img
                key={w.provider_id}
                title={w.provider_name}
                className="w-[5vh] h-[5vh] object-cover rounded-md"
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt=""
              />
            ))}
          </div>
        )}

        {info.watchProvider && info.watchProvider.rent && (
          <div className="flex gap-x-10 items-center text-white font-semibold">
            <h1>Rent:</h1>
            {info.watchProvider.rent.map((w) => (
              <img
                key={w.provider_id}
                title={w.provider_name}
                className="w-[5vh] h-[5vh] object-cover rounded-md"
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt=""
              />
            ))}
          </div>
        )}

        {info.watchProvider && info.watchProvider.buy && (
          <div className="flex gap-x-10 items-center text-white font-semibold">
            <h1>Buy:</h1>
            {info.watchProvider.buy.map((w) => (
              <img
                key={w.provider_id}
                title={w.provider_name}
                className="w-[5vh] h-[5vh] object-cover rounded-md"
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt=""
              />
            ))}
          </div>
        )}
      </div>

      {/* Part 4 seasons*/}

      {info.details.seasons.length > 0 && (
        <div>
          <hr className="border-t border-gray-500 opacity-50 my-4 mx-16 mt-10" />

          <h1 className="text-3xl font-bold text-white mt-10 pl-5">Seasons</h1>
          <TrendingCards data={info.details.seasons} />
        </div>
      )}

      {/* Part 5 recommendations and similar*/}
      <hr className="border-t border-gray-500 opacity-50 my-4 mx-16 mt-10" />

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
      />

      <Outlet />
    </div>
  ) : (
    <Loading />
  );
};

export default TvShowDetails;
