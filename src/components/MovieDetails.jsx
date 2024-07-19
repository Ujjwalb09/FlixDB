import React, { useEffect } from "react";
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

  const { info } = useSelector((state) => state.movie);
  console.log(info);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    dispatch(asyncLoadMovie(id));

    return () => dispatch(removeMovie());
  }, [id]);
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
      className="relative w-screen h-[150vh] px-[10%]"
    >
      {/* {part 1 navigation} */}
      <nav className="h-[10vh] w-full text-zinc-200 flex gap-10 text-xl items-center">
        <Link
          onClick={() => navigate(-1)}
          className="hover:text-[#E9C46A] ri-arrow-left-line mr-5"
        ></Link>{" "}
        {info.details.homepage && (
          <a target="_blank" href={info.details.homepage}>
            <i className="hover:text-[#E9C46A] ri-external-link-line"></i>
          </a>
        )}
        <a
          target="_blank"
          href={`https://www.wikidata.org/wiki/${info.external_ids.wikidata_id}`}
        >
          <i className="hover:text-[#E9C46A] ri-earth-fill"></i>
        </a>
        <a
          className="hover:text-[#E9C46A]"
          target="_blank"
          href={`https://www.imdb.com/title/${info.external_ids.imdb_id}/`}
        >
          IMDB
        </a>
      </nav>

      {/* {part 2 poster and details} */}
      <div className="w-full flex">
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

          <div className="mt-1 mb-5 flex text-white items-center gap-x-1">
            <CircularProgress
              percentage={(info.details.vote_average * 10).toFixed(0)}
            />
            <h1 className="ml-3">{info.details.release_date}</h1>
            <span className="text-xl ml-3">•</span> {/* Bullet point */}
            <h1>{info.details.genres.map((g) => g.name).join(", ")}</h1>
            <span className="text-xl ml-3">•</span> {/* Bullet point */}
            <h1>{info.details.runtime} min</h1>
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
            <i class="ri-play-fill text-lg"></i>
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
        title="movies"
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

export default MovieDetails;
