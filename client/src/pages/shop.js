import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import Banner from "../components/Banner";
import Products from "../components/Products";

const MAX_TITLE_LENGTH = 20; // Set a maximum length for the title

const Home = () => {
  const data = useLoaderData();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(data.data);

  const handleInputChange = (e) => {
    const trimmedQuery = e.target.value.trim().toLowerCase();
    setSearchQuery(e.target.value);

    if (trimmedQuery) {
      const filteredProducts = data.data.filter((product) =>
        product.title.toLowerCase().includes(trimmedQuery)
      );
      setFilteredProducts(filteredProducts);
    } else {
      setFilteredProducts(data.data);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="container mx-auto p-4">
      <div className="text-center mb-4">
        <form onSubmit={handleFormSubmit} className="flex justify-center items-center">
          <input
            type="text"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={handleInputChange}
            className="w-full md:w-1/2 lg:w-1/3 p-3 rounded-full border focus:outline-none focus:ring focus:ring-blue-300 placeholder-gray-500 text-lg"
          />
          <button
            type="submit"
            className="ml-4 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Search
          </button>
        </form>
      </div>
      <div className="flex flex-wrap justify-center">
        {searchQuery !== "" ? (
          <div className="w-full md:w-11/12 lg:w-10/12 mb-4">
            <Products
              products={filteredProducts.map((product) => ({
                ...product,
              
                title: product.title.length > MAX_TITLE_LENGTH
                  ? product.title.substring(0, MAX_TITLE_LENGTH) + "..."
                  : product.title,
              }))}
            />
          </div>
        ) : (
          <>
            <Banner  />
            <div className="w-full md:w-11/12 lg:w-10/12 mb-4">
              <Products
                products={filteredProducts.map((product) => ({
                  ...product,
                  title: product.title.length > MAX_TITLE_LENGTH
                    ? product.title.substring(0, MAX_TITLE_LENGTH) + "..."
                    : product.title,
                }))}
                className="mb-4" // Add more margin for horizontal spacing
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
