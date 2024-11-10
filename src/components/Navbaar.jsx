import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { logout, selectAuthStatus } from "../Slices/Authlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchcart } from "../Slices/Cartslice";
const Navbaar = ({ size }) => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectAuthStatus);
  const { cartitems } = useSelector((state) => state.cart);
  const [isOpen, setIsOpen] = useState(false);
  // const { cartItems } = useContext(Shopcontext);
  // const userJson = localStorage.getItem("user");
  // const user = userJson ? JSON.parse(userJson) : null;
  const user = localStorage.getItem("user");

  const handlelogout = () => {
    dispatch(logout());
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    nav("/signin");
  };
  useEffect(() => {
    dispatch(fetchcart());
  }, []);
  return (
    <div className="flex items-center justify-between py-5 px-10 font-medium ">
      {/* <img src="" alt="" /> */}
      <Link to={"/"}>
        <h1 className="step-in-trend">
          Step<span style={{ color: "#A7A6BA" }}>In</span>Trend
        </h1>
      </Link>
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p class="text-lg">Home</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden"></hr>
        </NavLink>
        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          <p class="text-lg">Collection</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden"></hr>
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p class="text-lg">About</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden"></hr>
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p class="text-lg">Contact</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden"></hr>
        </NavLink>
      </ul>
      <div className="flex items-center gap-6">
        <div className="group relative">
          <Link to={"/signin"}>
            <i class="fa-solid fa-user"></i>
          </Link>
          <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
            <div className="flex flex-col gap-2 w-36 py-1 px-10 bg-slate-10 text-gray-500 rounded">
              <p className="cursor-pointer hover:text-black pl-14 pt-1 text-xl">
                {user ? user : "Guest"}
              </p>
              {user ? (
                <p
                  className="cursor-pointer hover:text-red-600 pl-14 pt-1 text-xl"
                  onClick={handlelogout}
                >
                  Logout
                </p>
              ) : (
                <Link to={"/signin"}>
                  <p className="cursor-pointer hover:text-green-500 pl-14 pt-1 text-xl">
                    Login
                  </p>
                </Link>
              )}
            </div>
          </div>
        </div>
        <Link to="/cart" className="relative flex items-center">
          <i className="fa-solid fa-cart-shopping text-gray-700 text-2xl"></i>{" "}
          <p className="absolute -top-1 -right-1 w-4 h-4 text-center leading-4 bg-red-500 text-white rounded-full text-xs">
            {cartitems.length}
          </p>
        </Link>

        <div>
          <button
            onClick={() => setIsOpen(true)}
            className="fixed top-4 left-4 p-2 bg-gray-800 text-white rounded-full shadow-lg z-50 sm:hidden"
          >
            ☰
          </button>

          <div
            className={`fixed top-0 left-0 h-full bg-white border-r border-gray-200 p-4 w-64 transform transition-transform ease-in-out duration-300 ${
              isOpen ? "translate-x-0" : "-translate-x-full"
            } sm:hidden`}
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-2 bg-gray-800 text-white rounded-full"
            >
              &times;
            </button>

            <ul className="flex flex-col gap-0 text-sm text-gray-700">
              <NavLink
                onClick={() => setIsOpen(false)}
                to="/"
                className="flex flex-col items-center gap-2"
              >
                <p>Home</p>
                <hr className="w-2/4 border-none h-[1px] bg-gray-700"></hr>
              </NavLink>
              <NavLink
                onClick={() => setIsOpen(false)}
                to="/collection"
                className="flex flex-col items-center gap-1"
              >
                <p>Collection</p>
                <hr className="w-2/4 border-none h-[1px] bg-gray-700"></hr>
              </NavLink>
              <NavLink
                onClick={() => setIsOpen(false)}
                to="/about"
                className="flex flex-col items-center gap-1"
              >
                <p>About</p>
                <hr className="w-2/4 border-none h-[1px] bg-gray-700"></hr>
              </NavLink>
              <NavLink
                onClick={() => setIsOpen(false)}
                to="/contact"
                className="flex flex-col items-center gap-1"
              >
                <p>Contact</p>
                <hr className="w-2/4 border-none h-[1px] bg-gray-700"></hr>
              </NavLink>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbaar;
