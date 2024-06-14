import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import UserContext from "../../context/userContext";

function Navbar() {
  const { user } = useContext(UserContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className="w-full p-4 md:pl-8 md:pr-8 h-auto flex flex-wrap justify-between items-center border-b-8 mb-4 bg-slate-500 sticky top-0 z-50">
        <div className="flex justify-between items-center w-full md:w-auto">
          <NavLink to="/" onClick={closeMenu}>
            <h2 className="hover:cursor-pointer text-4xl md:text-5xl font-mono font-bold">
              Share&Care
            </h2>
          </NavLink>
          <div className="flex items-center md:hidden">
            {user && (
              <NavLink to="/profile" onClick={closeMenu} className="mr-4">
                <div className="avatar">
                  <div className="w-8 rounded-full">
                  <img
                  src={
                    user?.avatar
                      ? user.avatar
                      : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                  }
                />{" "}
                  </div>
                </div>
              </NavLink>
            )}
            <button
              className="p-2 rounded-md focus:outline-none"
              onClick={toggleMenu}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </button>
          </div>
        </div>
        <div
          className={`flex-col md:flex-row md:flex md:gap-9 ${
            isMenuOpen ? "flex" : "hidden"
          } w-full md:w-auto mt-4 md:mt-0 md:ml-auto`}
        >
          <div className="flex flex-col md:flex-row md:gap-4 w-full md:w-auto">
            <NavLink
              to="/donate"
              className="block md:inline-block mt-2 md:mt-0"
              onClick={closeMenu}
            >
              <button className="btn btn-primary btn-md btn-outline w-full md:w-auto">
                Donate
              </button>
            </NavLink>
            <NavLink
              to="/volunteers"
              className="block md:inline-block mt-2 md:mt-0"
              onClick={closeMenu}
            >
              <button className="btn btn-primary btn-md btn-outline w-full md:w-auto">
                Volunteer
              </button>
            </NavLink>
            {!user && (
              <Link
                to="/login"
                className="block md:inline-block mt-2 md:mt-0"
                onClick={closeMenu}
              >
                <button
                  type="submit"
                  className="btn btn-primary w-full md:w-auto"
                >
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>
        {user && (
          <NavLink
            to="/profile"
            onClick={closeMenu}
            className="hidden md:block ml-4"
          >
            <div className="avatar">
              <div className="w-12 rounded-full">
                <img
                  src={
                    user?.avatar
                      ? user.avatar
                      : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                  }
                />{" "}
              </div>
            </div>
          </NavLink>
        )}
      </nav>
    </>
  );
}

export default Navbar;
