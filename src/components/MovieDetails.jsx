import React, { useEffect } from "react";
import { asyncLoadMovie, removeMovie } from "../store/actions/movieActions";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./Loading";

const MovieDetails = () => {
  const { info } = useSelector((state) => state.movie);
  console.log(info);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    dispatch(asyncLoadMovie(id));

    return () => dispatch(removeMovie());
  }, []);
  return info ? (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.2), rgba(0,0,0,.5), rgba(0,0,0,.8)), url(https://image.tmdb.org/t/p/original/${
          info.details.backdrop_path ||
          info.details.poster_path ||
          info.details.profile_path
        })`,
        backgroundPosition: "top 5%",
        backgroundSize: "cover",
      }}
      className="w-screen h-screen px-[10%]"
    >
      {/* {part 1 navigation} */}
      <nav className="h-[10vh] w-full text-zinc-200 flex gap-10 text-xl items-center">
        <Link
          onClick={() => navigate(-1)}
          className="hover:text-[#E9C46A] ri-arrow-left-line mr-5"
        ></Link>{" "}
        <a target="_blank" href={info.details.homepage}>
          <i className="hover:text-[#E9C46A] ri-external-link-line"></i>
        </a>
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
          className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[40vh] object-cover"
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
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default MovieDetails;
