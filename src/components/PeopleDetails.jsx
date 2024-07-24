import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { asyncLoadPeople } from "../store/actions/peopleAction";
import Topnav from "./templates/Topnav";
import Loading from "./Loading";
import TrendingCards from "./templates/TrendingCards";

const PeopleDetails = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { info } = useSelector((state) => state.people);

  console.log(info);

  useEffect(() => {
    dispatch(asyncLoadPeople(id));
  }, [id]);

  useEffect(() => {
    document.title = info ? `FlixDB | ${info.details.name}` : "FlixDB";
  }, [info]);

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
        background: `linear-gradient(rgba(0,0,0,.8), rgba(0,0,0,.8), rgba(0,0,0,.8)), url(https://image.tmdb.org/t/p/original/${info.details.profile_path})`,
        backgroundPosition: "top 55% left 50%",
        backgroundSize: "cover",
      }}
      className="relative w-screen h-[250vh] px-[10%]"
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
          src={`https://image.tmdb.org/t/p/original/${info.details.profile_path}`}
          alt={
            info.details.name ||
            info.details.title ||
            info.details.original_name ||
            info.details.original_title
          }
        />

        <div className="content ml-[3%] text-white">
          <div className="flex">
            <h1 className="text-5xl font-black text-white ">
              {info.details.name ||
                info.details.title ||
                info.details.original_name ||
                info.details.original_title}
            </h1>

            {/* social Links   */}
            <div className="flex gap-4 text-[34px] ml-6">
              {info.external_ids.facebook_id && (
                <a
                  target="_blank"
                  href={`https://www.facebook.com/${info.external_ids.facebook_id}`}
                  className="hover:scale-125"
                >
                  <i className="ri-facebook-circle-fill text-[30px] text-[#E9C46A] duration-200"></i>
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

          <div className="text-[#E9C46A] flex gap-1 mt-3">
            <div className="flex gap-2 items-center">
              <i className="text-[18px] ri-star-fill text-[#E9C46A]"></i>{" "}
              <p>{Math.floor(info.details.popularity)}</p>
            </div>

            <span className="text-xl ml-4">•</span>
            <h1>
              {info.details.birthday}
              {info.details.deathday && ` - ${info.details.deathday}`}
            </h1>
            <span className="text-xl ml-4">•</span>
            <h1>{info.details.place_of_birth}</h1>
          </div>

          <h1 className="mb-3 text-3xl mt-5">Biography</h1>
          <p className="mb-1 text-[19px]">{info.details.biography}</p>
        </div>
      </div>

      {/* Part 5 movies*/}
      <hr className="border-t border-gray-500 opacity-50 my-4 mx-16 mt-10" />

      <h1 className="text-3xl font-bold text-white mt-10 pl-5 mb-3">
        {info.movieCredits.cast.length > 0 && `Movies by ${info.details.name}`}
      </h1>
      <TrendingCards
        data={info.movieCredits.cast.length > 0 && info.movieCredits.cast}
        title="movies"
      />

      {/* Part 6 tv shows*/}
      <hr className="border-t border-gray-500 opacity-50 my-4 mx-16 mt-10" />

      <h1 className="text-3xl font-bold text-white mt-10 pl-5 mb-3">
        {info.tvCredits.cast.length > 0 && `Appeared On`}
      </h1>
      <TrendingCards
        data={info.tvCredits.cast.length > 0 && info.tvCredits.cast}
        title="tv_shows"
      />
    </div>
  ) : (
    <Loading />
  );
};

export default PeopleDetails;
