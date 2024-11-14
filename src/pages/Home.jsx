import React from "react";
import Hero from "../components/Hero";
import Latestcollection from "../components/Latestcollection";
import Bestseller from "../components/Bestseller";
import Ourpolicy from "../components/Ourpolicy";
import Footer from "../components/Footer";
import Navbaar from "../components/Navbaar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
if (localStorage.getItem("id")) {
  toast.success("Loged In");
} else {
  toast.error("Loged Out");
}
const Home = () => {
  return (
    <div>
      <ToastContainer />
      <Navbaar />
      <Hero />
      <Latestcollection />
      <Bestseller />
      <Ourpolicy />
      <Footer />
    </div>
  );
};

export default Home;
