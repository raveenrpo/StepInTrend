import React, { useEffect, useState } from "react";
import Title from "../components/Title";
import { Link, useNavigate } from "react-router-dom";
import Navbaar from "../components/Navbaar";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchcart,
  quantity_decrement,
  quantity_increment,
  remove_prd_fromcart,
} from "../Slices/Cartslice";
import { razorordercreation } from "../Slices/Orderslice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Cart = () => {
  // const { cartItems, currency, delevaryfee, carttotal, deleteitem, quantity } =
  //   useContext(Shopcontext);
  const nav = useNavigate();
  const userid = localStorage.getItem("id");
  const dispatch = useDispatch();
  const { cartitems } = useSelector((state) => state.cart);
  const { currency, deliveryFee } = useSelector((state) => state.shop);

  const calcsubtotal = cartitems.reduce((t, v) => t + v.price * v.quantity, 0);
  const calctotal = calcsubtotal + deliveryFee;
  useEffect(() => {
    dispatch(fetchcart());
  }, [dispatch]);

  console.log(cartitems);
  // const user = JSON.parse(userJson);
  const inc_qnt = (id) => {
    dispatch(quantity_increment(id));
  };

  const dec_qnt = (id) => {
    dispatch(quantity_decrement(id));
  };

  const del_item = (id) => {
    dispatch(remove_prd_fromcart(id));
    toast.warning("Item Removed From Cart");
  };

  const ordercreate = (calctotal) => {
    dispatch(razorordercreation(calctotal));
    nav("/payment");
  };

  return (
    <div>
      <Navbaar />
      <ToastContainer />
      <div className="p-10">
        <div className="text-center text-2xl pt-10 border-t">
          <Title text1={"Your "} text2={" Cart"} />
        </div>
        {cartitems.length === 0 ? (
          <div className="text-center mt-10">
            <p>Your cart is empty.</p>
          </div>
        ) : (
          <div className="mt-10">
            <ul className="space-y-4">
              {cartitems.map((item, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center border-b pb-4 mb-4"
                >
                  <div className="flex items-center">
                    <img
                      src={item.imageUrl}
                      className="w-16 h-16 object-cover mr-4"
                    />
                    <div>
                      <p className="font-semibold">{item.title}</p>
                      <p>{`Quantity: ${item.quantity}`}</p>
                      <p>{`Price: ${currency}${item.price}`}</p>
                    </div>
                  </div>
                  <p>{`Total: ${currency}${item.price * item.quantity}`}</p>
                  <div className="flex gap-2">
                    <button
                      className="bg-black text-white rounded-lg px-2"
                      onClick={() => inc_qnt(item.productId)}
                    >
                      +
                    </button>
                    <button
                      className="bg-black text-white rounded-lg px-2"
                      onClick={() => del_item(item.productId)}
                    >
                      Dlete
                    </button>
                    <button
                      className="bg-black text-white rounded-lg px-2"
                      onClick={() => dec_qnt(item.productId)}
                    >
                      -
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex justify-between mt-10 text-lg ">
              <p>Subtotal:</p>
              <p>{calcsubtotal}</p>
            </div>
            <div className="flex justify-between text-lg ">
              <p>Delivery Fee:</p>
              <p>{`${currency}${deliveryFee}`}</p>
            </div>
            <div className="flex justify-between text-xl font-bold mt-4">
              <p>Total:</p>
              <p>{calctotal}</p>
            </div>
            <div className="text-center mt-10">
              {/* <Link to={`/payment/${userid}`}> */}
              <button
                className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700"
                onClick={() => ordercreate(calctotal)}
              >
                Place To Order
              </button>
              {/* </Link> */}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
