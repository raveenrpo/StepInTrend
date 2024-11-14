import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbaar from "./components/Navbaar";
import Collection from "./pages/Collection";
import Footer from "./components/Footer";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Product from "./pages/Product";
import Login from "./pages/Login";
import Signin from "./pages/Signin";
import Payment from "./pages/Payment";
import Adminhome from "./admin/adminhome";
import Adminuser from "./admin/Adminuser";
import Adminproduct from "./admin/Adminproduct";
import Admincart from "./admin/Admincart";
import Addnewproduct from "./admin/Addnewproduct";
import Updateproduct from "./admin/Updateproduct";
import Adminorder from "./admin/Adminorder";
import Wish_List from "./pages/Wish_List";
import Adminorders from "./admin/Adminorders";
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/product/:productid" element={<Product />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />{" "}
        <Route path="/payment" element={<Payment />} />
        <Route path="/wishlist" element={<Wish_List />} />
        <Route path="/adminhome" element={<Adminhome />} />
        <Route path="/adminuser" element={<Adminuser />} />
        <Route path="/adminproduct" element={<Adminproduct />} />
        <Route path="/updateproduct/:item" element={<Updateproduct />} />
        <Route path="/adminorder" element={<Adminorder />} />
        <Route path="/adminorders/:id" element={<Adminorders />} />
        {/* <Route path="/adminorder/:orderid" element={<Adminorder />} /> */}
        {/*
        <Route path="/admincart/:userid" element={<Admincart />} />
        <Route path="/addnewproduct" element={<Addnewproduct />} />
        */}
      </Routes>
    </div>
  );
};

export default App;
