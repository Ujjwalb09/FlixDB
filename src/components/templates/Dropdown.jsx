import React from "react";
import ReactSelect from "react-select";

const Dropdown = ({ title, options, func, value }) => {
  return (
    <div className="select">
      <select
        value={value}
        onChange={func}
        defaultValue="0"
        name="format"
        id="format"
      >
        <option value="0" disabled>
          {title}
        </option>
        {options.map((o, i) => (
          <option key={i} value={o}>
            {o.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
