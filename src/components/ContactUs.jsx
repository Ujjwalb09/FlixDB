import React from "react";
import Topnav from "./templates/Topnav";
import { Link, useNavigate } from "react-router-dom";

const ContactUs = () => {
  const navigate = useNavigate();
  return (
    <div className="w-screen h-screen">
      <div
        className={`fixed top-0 left-0 w-full z-10 px-[5%] flex items-center justify-between h-16 py-5 transition-all duration-300 "bg-black bg-opacity-75" : "bg-black"`}
      >
        <h1 className="flex text-2xl font-semibold text-zinc-400">
          <i
            onClick={() => navigate("/")}
            className="hover:text-[#E9C46A] ri-arrow-left-line mr-7"
          ></i>{" "}
          <Link to="/">
            <i className="text-[#E9C46A] ri-movie-fill mr-2"></i>
            <span className=" text-[#E7F0DC] mr-2">
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
      <div className="w-screen h-screen flex items-center justify-center bg-[#1F1E24]">
        <div class="flex items-center justify-center h-full w-full">
          <div class="max-w-md w-full bg-gray-700 rounded-lg shadow-lg p-6">
            <h2 class="text-2xl font-bold mb-4 text-white">Contact Us</h2>
            <form>
              <div class="mb-4">
                <label
                  class="block text-gray-300 text-sm font-bold mb-2"
                  for="name"
                >
                  Name
                </label>
                <input
                  class="shadow appearance-none border border-gray-600 rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline bg-gray-800"
                  id="name"
                  type="text"
                  placeholder="Your Name"
                  required
                />
              </div>
              <div class="mb-4">
                <label
                  class="block text-gray-300 text-sm font-bold mb-2"
                  for="email"
                >
                  Email
                </label>
                <input
                  class="shadow appearance-none border border-gray-600 rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline bg-gray-800"
                  id="email"
                  type="email"
                  placeholder="Your Email"
                  required
                />
              </div>
              <div class="mb-4">
                <label
                  class="block text-gray-300 text-sm font-bold mb-2"
                  for="message"
                >
                  Message
                </label>
                <textarea
                  class="shadow appearance-none border border-gray-600 rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline bg-gray-800"
                  id="message"
                  rows="4"
                  placeholder="Your Message"
                  required
                ></textarea>
              </div>
              <div class="flex items-center justify-between">
                <button
                  type="submit"
                  class="bg-[#E9C46A]  hover:bg-[#AF9350] hover:scale-105 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
