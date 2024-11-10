import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const Productitem = ({ id, img, title, price, category }) => {
  const { currency } = useSelector((state) => state.shop);
  return (
    <Link to={`/product/${id}`} className="text-gray-700 cursor-pointer">
      <div className="overflow-hidden">
        <img className="hover:scale-110 transition ease-in-out" src={img}></img>
      </div>
      <p className="pt-3 pb-1 text-sm">{title}</p>

      <div className="grid grid-cols-2 justify-evenly">
        <div>
          <p className="text-sm font-medium">{category}</p>
          <p className="text-sm font-medium">
            {currency}
            {price}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Productitem;
