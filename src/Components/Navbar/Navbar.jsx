import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../../Auth/AuthContext/AuthContext";
import MyLink from "../MyLink/MyLink";
import { GoHomeFill } from "react-icons/go";
import { LuBrainCircuit } from "react-icons/lu";
import { Link } from "react-router";
import { IoLogIn, IoLogOut } from "react-icons/io5";
import MyContainer from "../MyContainer/MyContainer";
import { ScaleLoader } from "react-spinners";
import { toast } from "react-toastify";
import { TfiViewList } from "react-icons/tfi";
import { MdAddBox } from "react-icons/md";
import { BiSolidPurchaseTag } from "react-icons/bi";
import logo from "/logo.png";
const Navbar = () => {
  const { user, setUser, signOutUser, loading } = use(AuthContext);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        toast.success("Sign Out Successfully");
        setUser(null);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const handleTheme = (checked) => {
    const newTheme = checked ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <MyContainer>
      <div>
        <div className="navbar py-0 min-h-0 z-1 rounded-full glass-card">
          <div className="navbar-start">
            {/* Mobile Dropdown */}
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost md:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>

              <ul
                tabIndex={-1}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow"
              >
                <li>
                  <MyLink to={"/"}>
                    <GoHomeFill />
                    Home
                  </MyLink>
                </li>
                <li>
                  <MyLink to={"/all-models"}>
                    <TfiViewList />
                    All Models
                  </MyLink>
                </li>
                <li>
                  {user && (
                    <MyLink to={"/all-models"}>
                      <MdAddBox />
                      Add Model
                    </MyLink>
                  )}
                </li>
              </ul>
            </div>

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <img className="h-8 w-8" src={logo} alt="" />
              <span className="text-2xl font-bold text-[#0f7c76]">
                AI ModelVault
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="navbar-center hidden md:flex">
            <ul className="menu menu-horizontal px-1 gap-10">
              <li>
                <MyLink to={"/"}>
                  <GoHomeFill />
                  Home
                </MyLink>
              </li>
              <li>
                <MyLink to={"/all-models"}>
                  <TfiViewList />
                  All Models
                </MyLink>
              </li>
              <li>
                {user && (
                  <MyLink to={"/add-models"}>
                    <MdAddBox /> Add Model
                  </MyLink>
                )}
              </li>
            </ul>
          </div>

          {/* Right Section */}
          <div className="navbar-end gap-3">
            {/* THEME TOGGLE (Fixed – no close on click) */}
            <div onClick={(e) => e.stopPropagation()}>
              <label className="flex cursor-pointer gap-2 items-center">
                {/* Sun Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="5" />
                  <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
                </svg>

                <input
                  type="checkbox"
                  onChange={(e) => handleTheme(e.target.checked)}
                  checked={theme === "dark"}
                  className="toggle"
                />

                {/* Moon Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
              </label>
            </div>
            {loading ? (
              <ScaleLoader color="#00FF00"></ScaleLoader>
            ) : user ? (
              <div className="dropdown dropdown-end z-50">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-9 border-2 border-gray-300 rounded-full">
                    <img
                      alt="User Avatar"
                      referrerPolicy="no-referrer"
                      src={
                        user.photoURL ||
                        "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                      }
                    />
                  </div>
                </div>

                <ul
                  tabIndex={-1}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow z-90"
                >
                  {/* User Info */}
                  <div className="pb-3 border-b border-b-gray-200">
                    <li className="text-sm font-bold">{user?.displayName}</li>
                    <li className="text-xs">{user?.email}</li>
                  </div>

                  <li className="mt-3">
                    <Link to={"/purchase"}>
                      <BiSolidPurchaseTag /> My Purchase
                    </Link>
                  </li>

                  <li className="mt-3">
                    <Link to={"/my-models"}>
                      <LuBrainCircuit /> My Models
                    </Link>
                  </li>
                  {/* Logout */}
                  <li>
                    <button
                      onClick={handleSignOut}
                      className="btn btn-sm text-left bg-gradient-to-br from-[#0d3c3b] to-[#0f7c76] text-white"
                    >
                      <IoLogOut /> Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <Link
                to={"/login"}
                className="btn rounded-full border-gray-300 btn-md bg-gradient-to-br from-[#0d3c3b] to-[#0f7c76] text-white"
              >
                <IoLogIn /> Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </MyContainer>
  );
};

export default Navbar;
