import React, { useEffect, useRef, useState } from "react";
import { asyncLoadMovie, removeMovie } from "../store/actions/movieActions";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./Loading";
import TrendingCards from "./templates/TrendingCards";
import Topnav from "./templates/Topnav";

const CircularProgress = ({ percentage }) => {
  const circleWidth = 60; // Increased from 39
  const radius = 26; // Increased from 18
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
          strokeWidth="4" // Increased from 3
          r={radius}
          className="fill-[#081c22] stroke-[#081c22]"
        />
        <circle
          cx={circleWidth / 2}
          cy={circleWidth / 2}
          strokeWidth="4" // Increased from 3
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
          className="fill-white text-[16px] font-bold" // Increased from 10px
        >
          {`${percentage}%`}
        </text>
      </svg>
    </span>
  );
};

const MovieDetails = () => {
  const { pathname } = useLocation();
  const [created, setCreated] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { info } = useSelector((state) => state.movie);
  console.log(info);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    info ? (document.title = `FlixDB | ${info.details.title}`) : "FlixDB";
  }, [info]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    dispatch(asyncLoadMovie(id));

    return () => dispatch(removeMovie());
  }, [id]);

  useEffect(() => {
    const handleScroll = () => {
      const scroll = window.scrollY;
      console.log(scroll);
      if (scroll > 10) {
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
      className="relative w-screen h-[165vh] px-[10%] overflow-y-auto"
    >
      {/* Search bar and logo */}
      <div
        className={`fixed top-0 left-0 w-full z-10 px-[5%] flex items-center justify-between h-16 py-5 transition-all duration-300 ${
          isScrolled ? "bg-black bg-opacity-80" : "bg-black bg-opacity-20"
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
          className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[50vh] object-cover w-[40%]"
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
              ({info.details.release_date.split("-")[0]})
            </small>
          </h1>

          <div className="mt-1 mb-5 flex items-center gap-x-1 text-white">
            {info.details.vote_average != 0 && (
              <CircularProgress
                percentage={(info.details.vote_average * 10).toFixed(0)}
              />
            )}

            <div className="text-[#E9C46A] flex gap-2">
              <span className="text-xl ml-3">•</span>
              <h1>{info.details.release_date}</h1>
              <span className="text-xl ml-3">•</span> {/* Bullet point */}
              <h1>{info.details.genres.map((g) => g.name).join(", ")}</h1>
              <span className="text-xl ml-3">•</span> {/* Bullet point */}
              <h1>{info.details.runtime} min</h1>
            </div>
          </div>

          <h1 className="text-2xl font-semibold italic text-zinc-200">
            {info.details.tagline}
          </h1>
          <h1 className="mb-3 text-2xl mt-5">Overview</h1>
          <p className="mb-7">{info.details.overview}</p>

          <Link
            to={`${pathname}/trailer`}
            className="px-3 py-2 text-sm rounded-full font-semibold bg-[#E9C46A] text-white tracking-tight hover:bg-[#AF9350] hover:scale-105 duration-200 inline-flex items-center justify-center"
          >
            <i class="ri-play-fill text-lg"></i>
            Play Trailer
          </Link>

          <div className="flex gap-8 mt-8">
            {info.external_ids.facebook_id && (
              <a
                target="_blank"
                href={`https://www.facebook.com/${info.external_ids.facebook_id}`}
                className="hover:scale-125"
              >
                <i className="ri-facebook-circle-fill text-[30px] text-[#E9C46A] hover:scale-125 duration-200"></i>
              </a>
            )}

            {info.external_ids.twitter_id && (
              <a
                target="_blank"
                href={`https://x.com/${info.external_ids.twitter_id}`}
                className="hover:scale-125"
              >
                <i className="ri-twitter-fill text-[30px] text-[#E9C46A] duration-200"></i>
              </a>
            )}

            {info.external_ids.instagram_id && (
              <a
                target="_blank"
                href={`https://www.instagram.com/${info.external_ids.instagram_id}`}
                className="hover:scale-125"
              >
                <i className="ri-instagram-fill text-[30px] text-[#E9C46A] duration-200"></i>
              </a>
            )}

            {info.details.homepage && (
              <a
                target="_blank"
                href={`${info.details.homepage}`}
                className="hover:scale-125"
              >
                <i className="ri-link-unlink-m text-[30px] text-[#E9C46A] duration-200"></i>
              </a>
            )}
          </div>
        </div>
      </div>

      {/*part 3 available platforms/watchproviders*/}
      <div className="w-[80%] flex flex-col gap-y-5 mt-10">
        {info.watchProvider && info.watchProvider.flatrate && (
          <div className="flex gap-x-10 items-center text-white font-semibold">
            <h1>Watch Now:</h1>
            {info.watchProvider.flatrate.map((w, i) => (
              <img
                key={i}
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
            {info.watchProvider.rent.map((w, i) => (
              <img
                key={i}
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
            {info.watchProvider.buy.map((w, i) => (
              <img
                key={i}
                title={w.provider_name}
                className="w-[5vh] h-[5vh] object-cover rounded-md"
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt=""
              />
            ))}
          </div>
        )}
      </div>

      {/* Part 4 recommendations and similar*/}
      <hr class="border-t border-gray-500 opacity-50 my-4 mx-16 mt-10" />

      <h1 className="text-3xl font-bold text-white mt-10 pl-5">
        {info.recommendations.length > 0 ? "Recommendations" : "Similar"}
      </h1>
      <TrendingCards
        data={
          info.recommendations.length > 0 ? info.recommendations : info.similar
        }
        title="movies"
      />

      <Outlet />
    </div>
  ) : (
    <Loading />
  );
};

export default MovieDetails;
