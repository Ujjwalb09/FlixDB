import React from "react";
import Topnav from "./templates/Topnav";
import { Link, useNavigate } from "react-router-dom";

const ContactUs = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-[rgba(0,0,0,.7)] absolute z-[100] top-0 left-0 w-screen h-screen flex items-center justify-center">
      <Link
        to="/"
        className="hover:text-[#E9C46A] mr-5 absolute text-2xl text-white left-[15%] top-[15%] hover:scale-110
        "
      >
        <i
          onClick={() => navigate(-1)}
          className="hover:text-[#E9C46A] ri-arrow-left-line mr-2"
        ></i>
        Back
      </Link>{" "}
      <div class="max-w-md w-full bg-[#F5EDED] rounded-lg shadow-lg p-6">
        <h2 class="text-2xl font-bold mb-4 text-black">Contact Us</h2>
        <form>
          <div class="mb-4">
            <label class="block text-black text-sm font-bold mb-2" for="name">
              Name
            </label>
            <input
              class="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline bg-[#F5EDED] "
              id="name"
              type="text"
              placeholder="Your Name"
              required
            />
          </div>
          <div class="mb-4">
            <label class="block text-black text-sm font-bold mb-2" for="email">
              Email
            </label>
            <input
              class="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline bg-[#F5EDED] "
              id="email"
              type="email"
              placeholder="Your Email"
              required
            />
          </div>
          <div class="mb-4">
            <label
              class="block text-black text-sm font-bold mb-2"
              for="message"
            >
              Message
            </label>
            <textarea
              class="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline bg-[#F5EDED] "
              id="message"
              rows="4"
              placeholder="Your Message"
              required
            ></textarea>
          </div>
          <div class="flex items-center justify-between">
            <button
              type="submit"
              class="bg-[#E9C46A]  hover:bg-[#AF9350] hover:scale-105 text-white font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline flex gap-1"
            >
              <i class="ri-send-plane-fill"></i>
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
