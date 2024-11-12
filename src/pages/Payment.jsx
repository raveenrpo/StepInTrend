import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Shopcontext } from "../context/Shopcontext";
import Title from "../components/Title";
import { useDispatch, useSelector } from "react-redux";
import { fetchcart } from "../Slices/Cartslice";

const Payment = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const { userid } = useParams();
  const { cartitems } = useSelector((state) => state.cart);
  const { deliveryFee } = useSelector((state) => state.shop);
  const { orderid } = useSelector((state) => state.order);
  useEffect(() => {
    dispatch(fetchcart());
  }, [dispatch]);
  const calctotal = cartitems.reduce((t, v) => t + v.price * v.quantity, 0);
  const total = calctotal + deliveryFee;
  // const { payment, carttotal, delevaryfee, deletecart, cartItems } =
  //   useContext(Shopcontext);
  const [order, setorder] = useState({
    UserName: "",
    Phone: null,
    Address: "",
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
    const inputorder = {
      UserName: UserName,
      Phone: Phone,
      Address: Address,
      Total: total,
      Orderstring: orderid,
      TransactionId: 111,
    };

    deletecart(userid);
    setorder({
      UserName: "",
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
            value={order.UserName}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-800"
            placeholder="Enter your name"
          />
        </div>
        <div className="w-full">
          <input
            type="number"
            name="email"
            value={order.Phone}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-800"
            placeholder="Enter your Phone no:"
            required
          />
        </div>
        <div className="w-full">
          <input
            type="text"
            name="address"
            value={order.Address}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-800"
            placeholder="Enter your address"
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
