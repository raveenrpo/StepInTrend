import React, { useContext, useEffect, useState } from "react";
import { Shopcontext } from "../context/Shopcontext";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { getallusers } from "../Slices/Adminslice";

const Adminuser = () => {
  // const { usercount, toblock, tounblock, product } = useContext(Shopcontext);
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.admin);
  const [orderIds, setOrderIds] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    dispatch(getallusers());
  }, [dispatch]);
  // const fetchOrderData = () => {
  //   const ids = product.order.map((item) => item.userid);
  //   setOrderIds(ids);
  // };

  // useEffect(() => {
  //   fetchOrderData();
  // }, [product.order]);

  return (
    <div>
      <Link to={"/adminhome"}>
        <button className="pt-10 px-11 text-xl">
          <FontAwesomeIcon icon={faArrowLeft} />
          back
        </button>
      </Link>
      <div className="flex items-center justify-center mt-28 p-10 bg-gray-50">
        <div className="w-full max-w-4xl p-4 bg-white rounded-lg shadow-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xl font-medium text-gray-500">
                  Id
                </th>
                <th className="px-6 py-3 text-left text-xl font-medium text-gray-500">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xl font-medium text-gray-500">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xl font-medium text-gray-500">
                  Cart
                </th>
                <th className="px-6 py-3 text-left text-xl font-medium text-gray-500">
                  Block
                </th>
                <th className="px-6 py-3 text-left text-xl font-medium text-gray-500">
                  Block Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4">{item.id}</td>
                  <td className="px-6 py-4">{item.name}</td>
                  <td className="px-6 py-4">{item.email}</td>
                  {/* <td className="px-6 py-4">
                    {orderIds.includes(item.id) ? (
                      <button
                        className="px-8 py-1 bg-yellow-300 rounded-lg"
                        onClick={() => nav(`/adminorder/${item.id}`)}
                      >
                        Orders
                      </button>
                    ) : (
                      <button
                        className="px-8 py-1 bg-orange-300 rounded-lg"
                        onClick={() => nav(`/admincart/${item.id}`)}
                      >
                        {item.cart.length}
                      </button>
                    )}
                  </td> */}
                  <td className="px-6 py-4">
                    {item.isblocked ? (
                      <button
                        className="px-8 py-1 bg-gray-500 rounded-lg"
                        // onClick={() => tounblock(item.id)}
                      >
                        UnBlock
                      </button>
                    ) : (
                      <button
                        className="px-8 py-1 bg-teal-500  rounded-lg"
                        // onClick={() => toblock(item.id)}
                      >
                        Block
                      </button>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {item.isblocked ? (
                      <p className="text-red-600 text-xl">Blocked</p>
                    ) : (
                      <p className="text-green-600 text-xl">Active</p>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Adminuser;
