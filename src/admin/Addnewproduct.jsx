import React, { useContext, useState } from "react";
import { Shopcontext } from "../context/Shopcontext";
import Title from "../components/Title";

const Addnewproduct = ({ isOpen, onClose }) => {
  // const { addproduct } = useContext(Shopcontext);
  const [product, setproduct] = useState({
    title: "",
    description: "",
    imageUrl: "",
    stock: 10,
    price: "",
    categoryId: "",
  });

  const handlechange = (e) => {
    const { name, value } = e.target;
    setproduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    addproduct(product);
    setproduct({
      title: "",
      quantity: "",
      imageUrl: "",
      description: "",
      price: "",
      categoryId: "",
    });
    onClose();
  };
  if (!isOpen) return null;
  return (
    <div className="fixed inset-1 bg-gray-500 bg-opacity-10 flex justify-center items-center ">
      <div className="bg-gray-400 p-8  rounded-lg w-96 h-96 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600"
        >
          X
        </button>
        <p className="text-center">
          <Title text1={"Add "} text2={" Product"} />
        </p>
        <form
          onSubmit={handlesubmit}
          className="flex flex-col items-center sm:max-w-96 m-auto mt-14 gap-4 text-gray-600"
        >
          <input
            className="ms-2 ps-1 border rounded border-gray-400	"
            type="text"
            name="title"
            value={product.title}
            onChange={handlechange}
            placeholder="Title"
            required
          />
          <input
            className="ms-2 ps-1 border rounded border-gray-400	"
            type="text"
            name="img"
            value={product.description}
            onChange={handlechange}
            placeholder="Image URL"
            required
          />
          <input
            className="ms-2 ps-1 border rounded border-gray-400	"
            type="text"
            name="rating"
            value={product.stock}
            onChange={handlechange}
            placeholder="Rating"
            required
          />
          <input
            type="text"
            className="ms-2 ps-1 border rounded border-gray-400	"
            name="price"
            value={product.price}
            onChange={handlechange}
            placeholder="Price"
            required
          />
          <input
            type="text"
            className="ms-2 ps-1 border rounded border-gray-400	"
            name="category"
            value={product.categoryId}
            onChange={handlechange}
            placeholder="Category"
            required
          />
          <button
            type="submit"
            className="bg-red-600 text-white px-4 py-2 rounded-lg"
          >
            ADD PRODUCT
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addnewproduct;
