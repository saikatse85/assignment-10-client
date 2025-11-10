import React from "react";
import { NavLink } from "react-router";

const MyLink = ({ to, children }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `py-2 px-3 mt-1 flex items-center font-semibold transition-all 
        ${isActive ? "text-[#0f7c76]" : "text-gray-700 dark:text-white"}
        hover:text-[#0f7c76]`
      }
    >
      {children}
    </NavLink>
  );
};

export default MyLink;
