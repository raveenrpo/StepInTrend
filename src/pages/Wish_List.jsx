import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Productitem from "../components/Productitem";
import { getwishlist } from "../Slices/Wishlist";
import Navbaar from "../components/Navbaar";
import Footer from "../components/Footer";
import Title from "../components/Title";
const Wish_List = () => {
  const { Wishlist } = useSelector((state) => state.wish);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getwishlist());
  }, [dispatch]);
  console.log(Wishlist);
  return (
    <div>
      <Navbaar />
      <div className="p-10">
        <div className="text-center text-2xl pt-10 border-t">
          <Title text1={"Your "} text2={" Wish List"} />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 gap-y-6">
          {Wishlist.map((item, index) => (
            <Productitem
              key={index}
              id={item.productId}
              img={item.imageUrl}
              title={item.title}
              price={item.price}
              category={item.category_Name}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Wish_List;
