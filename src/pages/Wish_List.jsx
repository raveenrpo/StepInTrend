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

        {/* Gallery grid layout */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 gap-y-10">
          {Wishlist.map((item, index) => (
            <div key={index} className="group relative">
              <Productitem
                id={item.productId}
                img={item.imageUrl}
                title={item.title}
                price={item.price}
                category={item.category_Name}
              />
              {/* <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex justify-center items-center transition-opacity">
                <span className="text-white text-lg font-semibold">
                  View Details
                </span>
              </div> */}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Wish_List;
