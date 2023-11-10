import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";

const Home = () => {
  const loaderData = useLoaderData();
  const productTitles = loaderData.data.map((product) => product.title);

  return (
    <div className="bg-gradient-to-r from-indigo-400 via-blue-400 to-teal-400 text-white">
      {/* Trendy Threads Section */}
      <div className="h-[500px] relative flex flex-col items-center justify-center text-center bg-gradient-to-r from-indigo-400 via-blue-400 to-teal-400">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          <span className="text-purple-500">Trendy</span>{" "}
          <span className="text-yellow-400">Threads</span>
        </h1>
        <TypeAnimation
          sequence={productTitles}
          speed={45}
          repeat={Infinity}
          wrapper="div"
          className="text-2xl md:text-4xl lg:text-5xl font-semibold"
        />
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-800 mb-4">
            Discover the Latest Trends
          </h2>
          <p className="text-black text-lg md:text-xl lg:text-2xl mb-8">
            Explore our curated collection of 🛒 fashion, 📱 gadgets, and 💼
            lifestyle products.
          </p>
          <div className="flex justify-center space-x-4"></div>
        </div>
        <span className="text-2xl md:text-3xl lg:text-4xl mb-8 text-gray-200">
          Your One-Stop Shop for Fashion, Gadgets, and More
        </span>

        <button className="bg-yellow-400 hover:bg-yellow-500 text-indigo-600 font-semibold text-lg md:text-xl lg:text-2xl py-2 px-6 rounded-full mt-6 transition duration-300 transform hover:scale-105">
          <Link to="/shop">🛒 Shop Now</Link>
        </button>
      </div>

      {/* Combined Content Section */}
    </div>
  );
};

export default Home;
