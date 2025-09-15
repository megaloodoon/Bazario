"use client";
import React, { ChangeEvent, useState } from "react";
import Container from "../Component/Container";
import axios from "axios";

function Dashboard() {
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    image: "",
    description: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChangeProduct = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const validateForm = () => {
    if (
      !newProduct.title.trim() ||
      !newProduct.price.trim() ||
      !newProduct.image.trim() ||
      !newProduct.description.trim()
    ) {
      setErrorMessage("All fields are required.");
      setSuccessMessage("");
      return false;
    }
    if (isNaN(Number(newProduct.price)) || Number(newProduct.price) <= 0) {
      setErrorMessage("Price must be a positive number.");
      setSuccessMessage("");
      return false;
    }
    // Simple image URL validation (optional, can be improved)
    if (
      !/^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i.test(newProduct.image.trim())
    ) {
      setErrorMessage(
        "Image link must be a valid URL ending with jpg, jpeg, png, webp, or gif."
      );
      setSuccessMessage("");
      return false;
    }
    return true;
  };

  const handleCreateProduct = async () => {
    setSuccessMessage("");
    setErrorMessage("");
    if (!validateForm()) return;
    try {
      // دریافت محصولات فعلی
      const res = await axios.get("http://localhost:3005/Products");
      const products: any[] = res.data;
      const newId = (Math.max(...products.map((p) => Number(p.id)), 0) + 1).toString();

      await axios({
        method: "POST",
        url: "http://localhost:3005/Products",
        data: {
          title: newProduct.title,
          price: Number(newProduct.price),
          image: newProduct.image,
          description: newProduct.description,
          id: newId,
        },
      });
      setSuccessMessage("Product added successfully!");
      setErrorMessage("");
      setNewProduct({ title: "", price: "", image: "", description: "" });
    } catch (err) {
      setErrorMessage("Error in adding product. Please try again.");
      setSuccessMessage("");
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center py-12">
      <Container>
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-fuchsia-400 to-cyan-300">
              Add New Product
            </h1>
            <p className="mt-2 text-slate-300/90">Create a new cosmic artifact for the store</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-[0_0_0_1px_rgba(255,255,255,0.06)] p-6">
            {successMessage && (
              <div className="bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 px-4 py-2 rounded mb-4 text-center">
                {successMessage}
              </div>
            )}
            {errorMessage && (
              <div className="bg-rose-500/15 border border-rose-400/30 text-rose-300 px-4 py-2 rounded mb-4 text-center">
                {errorMessage}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <input
                onChange={handleChangeProduct}
                name="title"
                type="text"
                placeholder="Title of Product"
                value={newProduct.title}
                className="bg-black/20 text-slate-100 placeholder:text-slate-400 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400/50 transition w-full"
              />
              <input
                onChange={handleChangeProduct}
                name="price"
                type="number"
                placeholder="Price"
                value={newProduct.price}
                className="bg-black/20 text-slate-100 placeholder:text-slate-400 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400/50 transition w-full"
              />
              <input
                onChange={handleChangeProduct}
                name="image"
                type="text"
                placeholder="Image Link"
                value={newProduct.image}
                className="bg-black/20 text-slate-100 placeholder:text-slate-400 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400/50 transition w-full"
              />
            </div>
            <textarea
              onChange={handleChangeProduct}
              name="description"
              className="bg-black/20 text-slate-100 placeholder:text-slate-400 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400/50 transition w-full mb-6 resize-none"
              placeholder="Product Details"
              id=""
              value={newProduct.description}
              rows={3}
            ></textarea>
            <button
              onClick={handleCreateProduct}
              className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg px-6 py-2 font-semibold shadow transition flex items-center gap-2 mx-auto"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              Add Product
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Dashboard;
