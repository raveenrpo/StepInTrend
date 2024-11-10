import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbaar from "../components/Navbaar";
import { fetchproductbyid } from "../Slices/Shopeslice";
import { addtocart, fetchcart } from "../Slices/Cartslice";
const Product = () => {
  const { productid } = useParams();
  console.log(productid);
  const { product } = useSelector((state) => state.shop);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchproductbyid(productid));
  }, [productid]);

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
          <p className="font-semibold text-xl text-gray-700">{product.title}</p>
          <p className="text-gray-500">{product.category}</p>
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
