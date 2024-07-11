import React from "react";

const GoBackBtn = ({ onClick }) => {
  return (
    <div>
      <button
        onClick={onClick}
        className=" w-full flex items-center justify-center px-3 py-2 text-sm text-black transition-colors duration-200 bg-[#E9C46A] border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-[#AF9350] hover:bg-[#AF9350] dark:text-white dark:border-gray-700 font-semibold"
      >
        <svg
          className="w-5 h-5 rtl:rotate-180"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
          />
        </svg>
        <span>Go back</span>
      </button>
    </div>
  );
};

export default GoBackBtn;
