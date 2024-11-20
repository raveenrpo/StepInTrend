import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Title from "../components/Title";
import { useDispatch, useSelector } from "react-redux";
import { fetchcart } from "../Slices/Cartslice";
import axiosinstance_cart from "../Axios instance/axiosinstance_cart";
import {
  createorder,
  paymentvalidation,
  razorordercreation,
} from "../Slices/Orderslice";

const Payment = () => {
  const dispatch = useDispatch();
  const { cartitems } = useSelector((state) => state.cart);
  const { deliveryFee } = useSelector((state) => state.shop);
  const { orderid, payment, placeorder } = useSelector((state) => state.order);

  const [razorpayLoaded, setRazorpayLoaded] = useState(false); // To track script load
  const [orderDetails, setOrderDetails] = useState({
    UserName: "",
    Phone: "",
    Address: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => setRazorpayLoaded(true);
    script.onerror = () => toast.error("Failed to load Razorpay script");
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    dispatch(fetchcart());
  }, [dispatch]);

  const calctotal = cartitems.reduce((t, v) => t + v.price * v.quantity, 0);
  const total = calctotal + deliveryFee;
  // useEffect(() => {
  //   dispatch(razorordercreation(total));
  // }, [total, dispatch]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!razorpayLoaded) {
      toast.error("Razorpay not loaded. Please try again later.");
      return;
    }

    if (orderid) {
      const razorpayOptions = {
        key: "rzp_test_UvZ01Swg0wVyTG",
        amount: total * 100,
        currency: "INR",
        name: "Step In Trend",
        description: "Order Payment",
        order_id: orderid,
        handler: async function (response) {
          const paymentData = {
            razorpay_payment_id: response.razorpay_payment_id, // Razorpay payment ID
            razorpay_order_id: response.razorpay_order_id, // Razorpay order ID
            razorpay_signature: response.razorpay_signature, // Razorpay signature
          };

          await verifyPayment(paymentData);
        },
        prefill: {
          name: orderDetails.UserName,
          email: "rpo@example.com", // Optional
          phone: orderDetails.Phone,
        },
        theme: {
          color: "#000",
        },
      };

      const razorpay = new window.Razorpay(razorpayOptions);
      razorpay.open();
    } else {
      toast.error("Failed to create order. Please try again.");
    }
  };

  const verifyPayment = async (paymentData) => {
    try {
      const response = dispatch(paymentvalidation(paymentData));
      if (response) {
        await placeOrder(paymentData);
      } else {
        toast.error("Payment verification failed.");
      }
    } catch (error) {
      console.error("Error verifying payment:", error);
      toast.error("Error verifying payment.");
    }
  };

  const placeOrder = async (paymentData) => {
    try {
      const orderData = {
        userName: orderDetails.UserName,
        phone: orderDetails.Phone,
        address: orderDetails.Address,
        total: total,
        orderstring: orderid,
        transactionId: paymentData.razorpay_payment_id,
      };

      const response = dispatch(createorder(orderData));

      if (response.status === 200 || response || placeorder) {
        toast.success("Order placed successfully!");
        toast.success("Order placed successfully!");
        navigate("/");
        toast.success("Order placed successfully!");
      } else {
        toast.error("Failed to place order.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Error placing order.");
    }
  };

  return (
    <div className="payment-container">
      <p className="text-center text-xl pt-10">
        <Title text1={"Your "} text2={" Payment"} />
      </p>
      <ToastContainer />
      <h2 className="text-center text-xl">Your Payment</h2>
      <form
        onSubmit={handleSubmit}
        className="payment-form flex flex-col items-center sm:max-w-96 m-auto mt-14 gap-4 text-gray-600"
      >
        <div className="w-full">
          <input
            type="text"
            name="UserName"
            value={orderDetails.UserName}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-800"
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="w-full">
          <input
            type="number"
            name="Phone"
            value={orderDetails.Phone}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-800"
            placeholder="Enter your phone number"
            required
          />
        </div>
        <div className="w-full">
          <input
            type="text"
            name="Address"
            value={orderDetails.Address}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-800"
            placeholder="Enter your address"
            required
          />
        </div>

        <button className="bg-black text-white py-1 px-2" type="submit">
          Proceed to Payment
        </button>
      </form>
    </div>
  );
};

export default Payment;

// 5267 3181 8797 5449
