import React, { useEffect, useState } from "react";
import { HeartIcon } from "@heroicons/react/20/solid";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbaar from "../components/Navbaar";
import { fetchproductbyid } from "../Slices/Shopeslice";
import { addtocart, fetchcart } from "../Slices/Cartslice";
import {
  addtowishlist,
  getwishlist,
  removefromwishlist,
} from "../Slices/Wishlist";
const Product = () => {
  const { productid } = useParams();
  console.log(productid);
  const { product } = useSelector((state) => state.shop);
  const { Wishlist } = useSelector((state) => state.wish);
  const dispatch = useDispatch();

  const isproductinwishlist = Wishlist.some((v) => v.productId == productid);

  const toggleLike = () => {
    if (isproductinwishlist) {
      dispatch(removefromwishlist(productid));
    } else {
      dispatch(addtowishlist(productid));
    }
  };

  useEffect(() => {
    dispatch(fetchproductbyid(productid));
    dispatch(getwishlist());
  }, [productid, dispatch]);

  const add = () => {
    dispatch(addtocart(productid));
  };

  console.log(product);
  return (
    <div>
      <Navbaar />
      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-22">
        <img className="w-full md:max-w-[480px]" src={product.imageUrl}></img>

        <div className="flex flex-col justify-center items-start gap-6">
          <div className="mx-60 relative top-14">
            <button
              className={`text-2xl ${
                isproductinwishlist ? "text-red-500" : "text-gray-300"
              }`}
              onClick={toggleLike}
            >
              <HeartIcon
                className={`w-6 h-6 ${
                  isproductinwishlist ? "text-red-500" : "text-gray-300"
                } transition-colors`}
              />
            </button>
          </div>
          <p className="font-semibold text-xl text-gray-700">{product.title}</p>
          <p className="text-gray-500">{product.category_Name}</p>
          <p className="text-xl text-black-500">${product.price}</p>
          <p className="text-gray-500">{product.description}</p>

          <button
            className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700"
            onClick={add}
          >
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
