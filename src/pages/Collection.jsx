import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import Title from "../components/Title";
import Productitem from "../components/Productitem";
import Navbaar from "../components/Navbaar";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchproductbycategory,
  fetchproducts,
  searchproduct,
} from "../Slices/Shopeslice";
const Collection = () => {
  const { products, product_by_category, searchproducts } = useSelector(
    (state) => state.shop
  );
  const dispatch = useDispatch();

  const [isCategoriesVisible, setIsCategoriesVisible] = useState(false);
  const [category, setcategory] = useState([]);
  const [search, setsearch] = useState("");

  useEffect(() => {
    dispatch(fetchproducts());
  }, [dispatch]);

  useEffect(() => {
    if (category == "All") {
      dispatch(fetchproducts());
    }
    if (category.length > 0) {
      dispatch(fetchproductbycategory(category));
    } else if (search.trim().length === 0) {
      dispatch(fetchproducts());
    }
  }, [category, dispatch, search]);

  useEffect(() => {
    if (search.trim().length > 0) {
      dispatch(searchproduct(search));
    } else if (category.length === 0) {
      dispatch(fetchproducts());
    } else {
      dispatch(fetchproducts());
    }
  }, [search, dispatch, category]);

  const toggleCategories = () => {
    setIsCategoriesVisible(!isCategoriesVisible);
  };

  const categorytog = (e) => {
    const value = e.target.value;
    setcategory((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const handleSearchBlur = () => {
    dispatch(fetchproducts());
    filterproduct = products; // Fetch all products if search is empty
  };
  const filterproduct =
    searchproducts.length > 0
      ? searchproducts
      : product_by_category.length > 0
      ? product_by_category
      : products;

  return (
    <div>
      <Navbaar />
      <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
        <div className="min-w-40 mx-2 pt-0">
          <p
            className="my-2 text-sm flex items-center cursor-pointer gap-2 "
            onClick={toggleCategories}
          >
            FILTER
            <FontAwesomeIcon
              icon={isCategoriesVisible ? faAngleUp : faAngleDown}
              className="text-xl m-1 mb-1 sm:hidden"
            />
          </p>
          <div
            className={`border border-gray-300 pl-5 py-3 mt-6 ${
              isCategoriesVisible ? "block" : "hidden"
            } md:block`}
          >
            <p className="mb text-sm font-medium">CATEGORIES</p>
            <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
              <p className="flex gap-2">
                <input
                  className="w-3"
                  type="checkbox"
                  defaultChecked
                  value={"All"}
                  name="cat"
                  onChange={categorytog}
                />
                All
              </p>
              <p className="flex gap-2">
                <input
                  className="w-3"
                  type="checkbox"
                  value={"Men"}
                  name="cat"
                  onChange={categorytog}
                />
                Men
              </p>
              <p className="flex gap-2">
                <input
                  className="w-3"
                  type="checkbox"
                  value={"Women"}
                  name="cat"
                  onChange={categorytog}
                />
                Women
              </p>
              <p className="flex gap-2">
                <input
                  className="w-3"
                  type="checkbox"
                  value={"Kids"}
                  name="cat"
                  onChange={categorytog}
                />
                Kids
              </p>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <div className="flex justify-between text-base sm:text-2xl mb-4">
            <Title text1={"ALL "} text2={" COLLECTION"} />
            <div className="pb-4">
              <i className="fas fa-search text-gray-500"></i>
              <input
                type="text"
                placeholder="search..."
                className="text-xl text-black  hover:bg-gray-100 rounded-lg"
                onChange={(e) => setsearch(e.target.value)}
                value={search}
                onBlur={handleSearchBlur}
              ></input>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
            {filterproduct.map((item, index) => (
              <Productitem
                key={index}
                id={item.id}
                img={item.imageUrl}
                title={item.title}
                price={item.price}
                category={item.category}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Collection;
