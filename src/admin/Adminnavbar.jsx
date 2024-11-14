import React from "react";
import { Link } from "react-router-dom";

const Adminnavbar = () => {
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
            </ul>
          </nav>
        </aside>
      </div>
    </div>
  );
};

export default Adminnavbar;
