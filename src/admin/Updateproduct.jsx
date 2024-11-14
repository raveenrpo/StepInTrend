import React, { useContext, useState, useEffect } from "react";
import Title from "../components/Title";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchproductbyid } from "../Slices/Shopeslice";
import { deleteproduct, updateproduct } from "../Slices/Adminslice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Updateproduct = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const { item } = useParams();
  const { products, product } = useSelector((state) => state.shop);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [updatedproduct, setupdatedproduct] = useState({
    title: "",
    description: "",
    price: "",
    stock: null,
    imageUrl: null,
    categoryId: null,
  });

  useEffect(() => {
    dispatch(fetchproductbyid(item));
  }, [dispatch, item]);

  console.log(product.title);

  useEffect(() => {
    if (product) {
      setupdatedproduct({
        title: product.title,
        description: product.description,
        price: product.price,
        stock: product.stock,
        imageUrl: product.imageUrl,
        categoryId: null,
      });
    }
  }, [product]);

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  const handlechange = (e) => {
    const { name, value, type, files } = e.target;
    if (type == "file") {
      setupdatedproduct((pre) => ({
        ...pre,
        imageUrl: files[0],
      }));
    } else {
      setupdatedproduct((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", updatedproduct.title);
    formData.append("description", updatedproduct.description);
    formData.append("price", updatedproduct.price);
    formData.append("stock", updatedproduct.stock);
    formData.append("categoryId", updatedproduct.categoryId);
    if (updatedproduct.imageUrl) {
      formData.append("image", updatedproduct.imageUrl);
    }

    dispatch(updateproduct(item, formData));

    setupdatedproduct({
      title: "",
      description: "",
      price: "",
      stock: 10,
      imageUrl: null,
      categoryId: 1,
    });
    toast.success("product is updated");
    toggleFormVisibility();
  };

  const deletesub = (id) => {
    dispatch(deleteproduct(id));
    toast.success("Product Deleted Successfully");
    nav("/adminproduct");
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ToastContainer />
      <div className="my-10 flex flex-col justify-center items-center md:flex-row gap-10 mb-22">
        {/* <img
          className="w-full md:max-w-[480px]"
          src={product.imageUrl}
          alt="Product"
        /> */}
        <img className="w-28 md:max-w-[480px]" src={product.imageUrl}></img>

        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-lg text-gray-400">
            <span className="text-2xl text-black">Name:</span> {product.title}
          </p>
          <p className="font-semibold text-lg text-gray-400">
            <span className="text-2xl text-black">Category:</span>{" "}
            {product.category_Name}
          </p>
          <p className="font-semibold text-lg text-gray-400">
            <span className="text-2xl text-black">Price:</span> {product.price}
          </p>

          <button
            className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700"
            onClick={toggleFormVisibility}
          >
            {isFormVisible ? "Cancel" : "Update Product"}
          </button>
          <button
            className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700"
            onClick={() => deletesub(product.id)}
          >
            Delete Product
          </button>
        </div>
      </div>

      {isFormVisible && (
        <div className="fixed inset-1 bg-gray-500 bg-opacity-10 flex justify-center items-center">
          <div className="bg-gray-400 p-8 rounded-lg w-[500px] h-[600px] relative">
            <button
              onClick={toggleFormVisibility}
              className="absolute top-2 right-2 text-gray-600"
            >
              X
            </button>
            <p className="text-center">
              <Title text1={"Update "} text2={" Product"} />
            </p>

            <form
              onSubmit={handlesubmit}
              className="flex flex-col items-center sm:max-w-96 m-auto mt-14 gap-4 text-gray-600"
            >
              <input
                className="ms-2 ps-1 border rounded border-gray-400"
                type="text"
                name="title"
                value={updatedproduct.title}
                onChange={handlechange}
                placeholder="Title"
                required
              />
              <input
                className="ms-2 ps-1 border rounded border-gray-400"
                type="text"
                name="description"
                value={updatedproduct.description}
                onChange={handlechange}
                placeholder="Description"
                required
              />
              <input
                className="ms-2 ps-1 border rounded border-gray-400"
                type="file"
                name="imageUrl"
                // value={updatedproduct.imageUrl}
                onChange={handlechange}
                required
              />
              <input
                className="ms-2 ps-1 border rounded border-gray-400"
                type="number"
                name="stock"
                value={updatedproduct.stock}
                onChange={handlechange}
                placeholder="Stock"
                required
              />
              <input
                className="ms-2 ps-1 border rounded border-gray-400"
                type="text"
                name="price"
                value={updatedproduct.price}
                onChange={handlechange}
                placeholder="Price"
                required
              />
              <input
                className="ms-2 ps-1 border rounded border-gray-400"
                type="number"
                name="categoryId"
                value={updatedproduct.categoryId}
                onChange={handlechange}
                placeholder="Category ID 1-Men 2-women 3-Kids"
                required
              />
              <button
                type="submit"
                className="bg-red-600 text-white px-4 py-2 rounded-lg"
              >
                UPDATE
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Updateproduct;
