import React, { useEffect, useState } from "react";
import Title from "./Title";
import Productitem from "./Productitem";
import { useDispatch, useSelector } from "react-redux";
import { fetchproducts } from "../Slices/Shopeslice";
const Latestcollection = () => {
  const { products } = useSelector((state) => state.shop);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchproducts());
  }, [dispatch]);
  // console.log(products);
  // console.log(products);

  const [latestproduct, setlatestproduct] = useState([]);

  useEffect(() => {
    setlatestproduct(products.slice(0, 10));
  }, [products]);
  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1="LATEST " text2=" COLLECTION" />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Step into Style with Our Latest Footwear Collection! Our newest
          arrivals are here to redefine your shoe game with an unparalleled
          blend of comfort and fashion-forward design. Explore the collection
          now and find your new favorite footwear!
        </p>
      </div>
      {/* product rendering */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {latestproduct.map((item, index) => (
          <Productitem
            key={index}
            id={item.id}
            img={item.imageUrl}
            title={item.title}
            price={item.price}
            category={item.category_Name}
          />
        ))}
      </div>
    </div>
  );
};

export default Latestcollection;
