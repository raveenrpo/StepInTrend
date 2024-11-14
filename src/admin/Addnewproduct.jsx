import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addproduct } from "../Slices/Adminslice";
import Title from "../components/Title";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Addnewproduct = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: "",
    stock: 10,
    imageUrl: null,
    categoryId: 1,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setProduct((prev) => ({
        ...prev,
        imageUrl: files[0],
      }));
    } else {
      setProduct((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", product.title);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("stock", product.stock);
    formData.append("categoryId", product.categoryId);
    if (product.imageUrl) {
      formData.append("image", product.imageUrl);
    }

    dispatch(addproduct(formData));
    toast.success("Item Added Successfully");
    setProduct({
      title: "",
      description: "",
      price: "",
      stock: 10,
      imageUrl: null,
      categoryId: 1,
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-1 bg-gray-500 bg-opacity-10 flex justify-center items-center ">
      <ToastContainer />
      <div className="bg-gray-400 p-8 rounded-lg w-96 h-auto relative">
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
          onSubmit={handleSubmit}
          className="flex flex-col items-center sm:max-w-96 m-auto mt-14 gap-4 text-gray-600"
        >
          <input
            className="ms-2 ps-1 border rounded border-gray-400"
            type="text"
            name="title"
            value={product.title}
            onChange={handleChange}
            placeholder="Title"
            required
          />
          <input
            className="ms-2 ps-1 border rounded border-gray-400"
            type="text"
            name="description"
            value={product.description}
            onChange={handleChange}
            placeholder="Description"
            required
          />
          <input
            className="ms-2 ps-1 border rounded border-gray-400"
            type="file"
            name="imageUrl"
            onChange={handleChange}
            required
          />
          <input
            className="ms-2 ps-1 border rounded border-gray-400"
            type="number"
            name="stock"
            value={product.stock}
            onChange={handleChange}
            placeholder="Stock"
            required
          />
          <input
            className="ms-2 ps-1 border rounded border-gray-400"
            type="text"
            name="price"
            value={product.price}
            onChange={handleChange}
            placeholder="Price"
            required
          />
          <input
            className="ms-2 ps-1 border rounded border-gray-400"
            type="number"
            name="categoryId"
            value={product.categoryId}
            onChange={handleChange}
            placeholder="Category ID"
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
