import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getorderbyid } from "../Slices/Adminslice";

const Adminorders = () => {
  const { id } = useParams();
  const { order } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getorderbyid(id));
  }, [dispatch]);
  console.log(order);
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
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xl font-medium text-gray-500">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xl font-medium text-gray-500">
                  Total price
                </th>
                <th className="px-6 py-3 text-left text-xl font-medium text-gray-500">
                  Order Date
                </th>
                <th className="px-6 py-3 text-left text-xl font-medium text-gray-500">
                  Image
                </th>
                <th className="px-24 py-3 text-left text-xl font-medium text-gray-500">
                  Order Id
                </th>
                {/* <th className="px-6 py-3 text-left text-xl font-medium text-gray-500">
                  Order Status
                </th> */}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {order.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4">{item.id}</td>
                  <td className="px-6 py-4">{item.title}</td>
                  <td className="px-6 py-4">{item.quantity}</td>
                  <td className="px-6 py-4">{item.totalPrice}</td>
                  <td className="px-6 py-4">{item.orderDate}ordered</td>
                  <td className="px-6 py-4">
                    <img src={item.image} width="50px" height="50px"></img>
                  </td>
                  <td className="px-6 py-4">{item.orderId}</td>
                  {/* <td className="px-6 py-4">{item.orderStatus}Pending</td> */}
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

export default Adminorders;
