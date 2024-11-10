import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Shopcontext } from "../context/Shopcontext";
import Title from "../components/Title";

const Payment = () => {
  const nav = useNavigate();
  const { userid } = useParams();
  // const { payment, carttotal, delevaryfee, deletecart, cartItems } =
  //   useContext(Shopcontext);
  const [order, setorder] = useState({
    name: "",
    email: "",
    address: "",
    number: "",
    userid: `${userid}`,
    // total: `${carttotal() + delevaryfee}`,
    // cart: cartItems,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setorder((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    payment(order);
    deletecart(userid);
    setorder({
      name: "",
      email: "",
      address: "",
      number: "",
      userid: `${userid}`,
      // total: `${carttotal() + delevaryfee}`,
      // cart: cartItems,
    });
  };

  return (
    <div>
      <p className="text-center text-xl pt-10">
        <Title text1={"Your "} text2={" Payment"} />
      </p>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center sm:max-w-96 m-auto mt-14 gap-4 text-gray-600"
      >
        <div className="w-full">
          <input
            type="text"
            name="name"
            value={order.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-800"
            placeholder="Enter your name"
          />
        </div>
        <div className="w-full">
          <input
            type="email"
            name="email"
            value={order.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-800"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="w-full">
          <input
            type="text"
            name="address"
            value={order.address}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-800"
            placeholder="Enter your address"
            required
          />
        </div>
        <div className="w-full">
          <input
            type="number"
            name="number"
            value={order.number}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-800"
            placeholder="Phone no"
            required
          />
        </div>
        <button className="bg-black text-white py-1 px-2" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Payment;
