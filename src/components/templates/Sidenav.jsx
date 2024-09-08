import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export default function Sidenav() {
  const sidenavRef = useRef(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const adjustHeight = () => {
      if (sidenavRef.current) {
        const windowHeight = window.innerHeight;
        if (windowHeight <= 700) {
          sidenavRef.current.style.height = `${windowHeight}px`;
          sidenavRef.current.style.overflowY = "auto";
          setIsSmallScreen(true);
        } else {
          sidenavRef.current.style.height = "auto";
          sidenavRef.current.style.overflowY = "visible";
          setIsSmallScreen(false);
        }
      }
    };

    adjustHeight();
    window.addEventListener("resize", adjustHeight);

    return () => window.removeEventListener("resize", adjustHeight);
  }, []);

  const linkClass = `hover:bg-[#E9C46A] hover:text-white rounded-lg duration-200 hover:scale-105 ${
    isSmallScreen ? "p-3 text-base" : "p-5 text-xl"
  }`;

  return (
    <div
      ref={sidenavRef}
      className="w-[20%] h-full border-r-2 border-zinc-400 p-6 overflow-x-hidden"
    >
      <a href="/">
        <h1
          className={`text-white font-bold ${
            isSmallScreen ? "text-xl" : "text-2xl"
          }`}
        >
          <i
            className="text-[#E9C46A] ri-movie-fill mr-2"
            aria-hidden="true"
          ></i>
          <span className="text-[#E7F0DC]">
            Flix<span className="text-[#E9C46A]">DB</span>
          </span>
        </h1>
      </a>

      <nav
        className={`flex flex-col text-zinc-400 gap-2 mt-6 ${
          isSmallScreen ? "text-base" : "text-xl"
        }`}
      >
        <h2
          className={`text-white font-semibold mb-3 ${
            isSmallScreen ? "text-lg" : "text-xl"
          }`}
        >
          New Feeds
        </h2>
        <Link to="/trending" className={linkClass}>
          <i className="ri-fire-fill mr-2" aria-hidden="true"></i> Trending
        </Link>
        <Link to="/popular" className={linkClass}>
          <i className="ri-bard-fill mr-2" aria-hidden="true"></i> Popular
        </Link>
        <Link to="/movies" className={linkClass}>
          <i className="ri-movie-2-fill mr-2" aria-hidden="true"></i> Movies
        </Link>
        <Link to="/tv_shows" className={linkClass}>
          <i className="ri-tv-2-fill mr-2" aria-hidden="true"></i> Tv Shows
        </Link>
        <Link to="/people" className={linkClass}>
          <i className="ri-team-fill mr-2" aria-hidden="true"></i> People
        </Link>
      </nav>

      <hr className="border-none h-[1px] bg-zinc-400 my-4" />

      <nav
        className={`flex flex-col text-zinc-400 gap-2 ${
          isSmallScreen ? "text-base" : "text-xl"
        }`}
      >
        <h2
          className={`text-white font-semibold mb-3 ${
            isSmallScreen ? "text-lg" : "text-xl"
          }`}
        >
          Website Information
        </h2>
        <Link to="/about" className={linkClass}>
          <i className="ri-information-fill mr-2" aria-hidden="true"></i> About
        </Link>
        <Link to="/contact_us" className={linkClass}>
          <i className="ri-phone-fill mr-2" aria-hidden="true"></i> Contact Us
        </Link>
      </nav>
    </div>
  );
}
