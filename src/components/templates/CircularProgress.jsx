import React from "react";

const CircularProgress = ({ percentage }) => {
  const circleWidth = 36;
  const radius = 16;
  const dashArray = radius * Math.PI * 2;
  const dashOffset = dashArray - (dashArray * percentage) / 100;

  return (
    <div className="w-9 h-9 absolute bottom-[1px] left-1">
      <svg
        width={circleWidth}
        height={circleWidth}
        viewBox={`0 0 ${circleWidth} ${circleWidth}`}
      >
        <circle
          cx={circleWidth / 2}
          cy={circleWidth / 2}
          strokeWidth="3"
          r={radius}
          className="fill-[#081c22] stroke-[#081c22]"
        />
        <circle
          cx={circleWidth / 2}
          cy={circleWidth / 2}
          strokeWidth="3"
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
          className="fill-white text-[10px] font-bold"
        >
          {`${percentage}%`}
        </text>
      </svg>
    </div>
  );
};

export default CircularProgress;
