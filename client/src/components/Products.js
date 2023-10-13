import React from "react";
import ProductsCard from "./ProductsCard";

const Products = ({ products }) => {
  return (
    <div className="py-10">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-2xl bg-black text-white py-2 w-80 text-center">
          Shop. Smile. Repeat.
        </h1>
        <span className="w-20 h-[3px] bg-black"></span>
        <p className="max-w-[700px] text-gray-600 text-center">
          "🌟 Welcome to Trendy Threads, Explore the latest trends, express your unique style, and revamp your life
            with our handpicked collection. From everyday essentials to tech gadgets,
            we've got it all. 🛒 Shop now and unlock a world of possibilities!""
        </p>
      </div>
      <div className="max-w-screen-xl mx-auto py-10 grid grid-cols-4 gap-10">
        {
          /* Mapping products */
          products.map((item) => (
            <ProductsCard key={item._id} product={item} />
          ))
        }
      </div>
    </div>
  );
};

export default Products;
