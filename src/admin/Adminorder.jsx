import React, { useContext, useState, useEffect } from "react";
import { Shopcontext } from "../context/Shopcontext";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getorders } from "../Slices/Adminslice";
import { Link } from "react-router-dom";
const Adminorder = () => {
  const { orders } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getorders());
  }, [dispatch]);

  const clk = (id) => {};
  return (
    <div>
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="w-full max-w-7xl p-4 bg-white rounded-lg shadow-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xl font-medium text-gray-500">
                  Id
                </th>
                <th className="px-6 py-3 text-left text-xl font-medium text-gray-500">
                  User Name
                </th>
                <th className="px-6 py-3 text-left text-xl font-medium text-gray-500">
                  Order Id
                </th>
                <th className="px-6 py-3 text-left text-xl font-medium text-gray-500">
                  Phone
                </th>
                <th className="px-6 py-3 text-left text-xl font-medium text-gray-500">
                  OrderStatus
                </th>
                <th className="px-6 py-3 text-left text-xl font-medium text-gray-500">
                  Order Date
                </th>
                <th className="px-24 py-3 text-left text-xl font-medium text-gray-500">
                  TransactionId
                </th>
                <th className="px-24 py-3 text-left text-xl font-medium text-gray-500">
                  Check More
                </th>

                {/* <th className="px-6 py-3 text-left text-xl font-medium text-gray-500">
                  Total price
                </th> */}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4">{item.id}</td>
                  <td className="px-6 py-4">{item.userName}</td>
                  <td className="px-6 py-4">{item.orderId}</td>
                  <td className="px-6 py-4">{item.phone}</td>
                  <td className="px-6 py-4">{item.orderStatus}ordered</td>
                  <td className="px-6 py-4">{item.orderDate}</td>
                  <td className="px-6 py-4">{item.transactionId}</td>
                  <td className="px-6 py-4">
                    <Link to={`/adminorders/${item.id}`}>
                      <button className="bg-black text-white rounded-lg px-2">
                        Click Here
                      </button>
                    </Link>
                  </td>

                  {/* <td className="px-6 py-4">
                    <ul>
                      {cartdetails.map((ite) => (
                        <li key={ite.id}>
                          <div>Title: {ite.title}</div>
                          <div>Quantity: {ite.quantity || "N/A"}</div>
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="px-6 py-4">{item.total}</td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Adminorder;
