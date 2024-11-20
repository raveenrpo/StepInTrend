import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../Slices/Authlice";

const Adminnavbar = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const clk = () => {
    dispatch(logout());
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    nav("/signin");
  };
  return (
    <div>
      <div className="flex h-screen">
        <aside className="w-64 bg-gray-800 text-white flex flex-col">
          <div className="flex items-center justify-center h-16 bg-gray-900">
            <h1 className="step-in-trend">
              Step<span style={{ color: "#A7A6BA" }}>In</span>Trend
            </h1>
          </div>
          <nav className="flex-1 mt-4">
            <ul className="space-y-2">
              <Link to={"/adminuser"}>
                <li className="flex items-center p-4 hover:bg-gray-700">
                  User
                </li>
              </Link>
              <Link to={"/adminproduct"}>
                <li className="flex items-center p-4 hover:bg-gray-700">
                  Product
                </li>
              </Link>
              <Link to={"/adminorder"}>
                <li className="flex items-center p-4 hover:bg-gray-700">
                  Orders
                </li>
              </Link>
              <button
                className="flex items-center p-4 text-red-500 "
                onClick={clk}
              >
                Log Out
              </button>
            </ul>
          </nav>
        </aside>
      </div>
    </div>
  );
};

export default Adminnavbar;
