import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { LoginStatusContext } from "../pages/HomePage";
import logotext from "../assets/hosteledge logo.png";
import logo from "../assets/hosteledge logo text.png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { loginStatus, setLoginStatus } = useContext(LoginStatusContext);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="bg-white lg:py-3 ">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 ">
        <nav className="relative flex items-center justify-between h-16 bg-white lg:rounded-md lg:shadow-lg lg:h-24 lg:px-8 lg:py-6 z-30">
          <div className="flex-shrink-0">
            <span className="flex">
              <img className="w-auto h-8 lg:h-10" src={logotext} alt="Logo" />
              <img className="w-auto h-8 lg:h-10" src={logo} alt="Logo" />
            </span>
          </div>

          {/* Hamburger Icon */}
          <button
            type="button"
            onClick={toggleMenu}
            className="inline-flex p-2 ml-5 text-black transition-all duration-200 rounded-md lg:hidden focus:bg-gray-100 hover:bg-gray-100"
          >
            {menuOpen ? (
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>

          {/* Desktop Links */}
          <div className="hidden ml-10 lg:flex lg:items-center lg:mr-auto lg:space-x-10">
            {["Features", "Solutions", "Resources", "Pricing"].map((link) => (
              <span
                key={link}
                href="#"
                title=""
                onClick={closeMenu}
                className="text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
              >
                {link}
              </span>
            ))}
          </div>

          {/* Login and Signup Links */}
          <div className="hidden lg:flex lg:items-center lg:space-x-10">
            {loginStatus == false ? (
              <Link to={"/register"}>
                <span
                  onClick={closeMenu}
                  className="py-2 text-base font-medium text-black transition-all duration-200 focus:text-blue-600"
                >
                  Sign up
                </span>
              </Link>
            ) : null}
            <Link to={"/"}>
              {loginStatus ? (
                <span
                  onClick={() => {
                    if (loginStatus) {
                      toast.success("Successfully sign out");
                      setLoginStatus(false);
                    }

                    closeMenu();
                  }}
                  className="py-2 text-base font-medium  border-red-600 text-red-600 transition-all duration-200 focus:text-red-600"
                >
                  Sign out
                </span>
              ) : (
                <span
                  onClick={() => {
                    closeMenu();
                  }}
                  className="py-2 text-base font-medium text-black transition-all duration-200 focus:text-blue-600"
                >
                  Sign in
                </span>
              )}
            </Link>
          </div>
        </nav>

        {/* Mobile Menu */}
        {menuOpen && (
          <nav className="flex flex-col py-4 pl-2 space-y-2 lg:hidden fixed top-10  bg-white border-2  w-full z-30 ">
            {["Features", "Solutions", "Resources", "Pricing"].map((link) => (
              <span
                key={link}
                href="#"
                title=""
                onClick={closeMenu}
                className="py-2 text-base font-medium text-black transition-all duration-200 focus:text-blue-600"
              >
                {link}
              </span>
            ))}
            {loginStatus == false ? (
              <Link to={"/register"}>
                <span
                  onClick={closeMenu}
                  className="py-2 text-base font-medium text-black transition-all duration-200 focus:text-blue-600"
                >
                  Sign up
                </span>
              </Link>
            ) : null}
            <Link to={"/"}>
              {loginStatus ? (
                <span
                  onClick={() => {
                    if (loginStatus) {
                      toast.success("Successfully sign out");
                      setLoginStatus(false);
                    }

                    closeMenu();
                  }}
                  className="py-2 text-base font-medium  transition-all duration-200 focus:text-red-600 border-red-600 text-red-600"
                >
                  Sign out
                </span>
              ) : (
                <span
                  onClick={() => {
                    closeMenu();
                  }}
                  className="py-2 text-base font-medium text-black transition-all duration-200 focus:text-blue-600"
                >
                  Sign in
                </span>
              )}
            </Link>
          </nav>
        )}
      </div>
      <ToastContainer />
    </header>
  );
};
