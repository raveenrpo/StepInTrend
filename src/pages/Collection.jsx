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
  productpagination,
} from "../Slices/Shopeslice";

const Collection = () => {
  const { product_by_category, searchproducts, product_by_pagination } =
    useSelector((state) => state.shop);
  const dispatch = useDispatch();
  const [isCategoriesVisible, setIsCategoriesVisible] = useState(false);
  const [category, setCategory] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  const getFilteredProducts = () => {
    if (search.trim().length > 0) {
      return searchproducts;
    }

    if (category.length > 0 && !category.includes("All")) {
      return product_by_category;
    }
    return product_by_pagination.length > 0 ? product_by_pagination : [];
  };

  useEffect(() => {
    if (category.length === 0 || category.includes("All")) {
      dispatch(fetchproducts());
    } else {
      dispatch(fetchproductbycategory(category));
    }
  }, [category, dispatch]);

  useEffect(() => {
    if (search.trim().length > 0) {
      dispatch(searchproduct(search));
    } else {
      dispatch(fetchproducts());
    }
  }, [search, dispatch]);

  useEffect(() => {
    dispatch(productpagination({ pageno: currentPage, pagesize: pageSize }));
  }, [currentPage, dispatch]);

  const toggleCategories = () => {
    setIsCategoriesVisible(!isCategoriesVisible);
  };

  const categorytog = (e) => {
    const value = e.target.value;

    if (value === "All") {
      setCategory(["All"]);
    } else {
      setCategory((prev) =>
        prev.includes(value)
          ? prev.filter((item) => item !== value)
          : [...prev, value]
      );
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchBlur = () => {
    dispatch(fetchproducts());
  };

  const filterproduct = getFilteredProducts();

  const totalPages = 4;
  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

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
                  checked={category.includes("All")}
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
                  checked={category.includes("Men")}
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
                  checked={category.includes("Women")}
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
                  checked={category.includes("Kids")}
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
                onChange={handleSearchChange}
                value={search}
                onBlur={handleSearchBlur}
              />
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

          {/* Pagination controls */}
          <div className="flex justify-center gap-3 mt-6">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-300 rounded"
            >
              Previous
            </button>
            {[...Array(totalPages)].map((_, index) => {
              const page = index + 1;
              return (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-4 py-2 border border-gray-300 rounded ${
                    page === currentPage ? "bg-gray-300" : ""
                  }`}
                >
                  {page}
                </button>
              );
            })}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-gray-300 rounded"
            >
              Next
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Collection;
