import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { cartImg, images } from "../assets/index";
import { useNavigate } from "react-router-dom";
import { FaLock } from "react-icons/fa";

const Header = () => {
  const productData = useSelector((state) => state.trendy.productData);
  const userInfo = useSelector((state) => state.trendy.userInfo);
  const navigate = useNavigate();

  const [showNavLinks, setShowNavLinks] = useState(false);

  const handleToggleNavLinks = () => {
    setShowNavLinks(!showNavLinks);
  };

  const handleDeliveryAddressClick = () => {
    if (!userInfo) {
      toast.error("Please login first");
      navigate("/login");
    } else {
      navigate("/delivery-address");
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setShowNavLinks(true);
      } else {
        setShowNavLinks(false);
      }
    };

    // Add an event listener to handle window resize
    window.addEventListener("resize", handleResize);

    // Initialize the state based on the initial window width
    handleResize();

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="w-full bg-yellow-400 font-titleFont border-b-[1px] border-b-gray-800 sticky top-0 z-50">
      <div className="max-w-screen-xl h-20 flex items-center justify-between px-4 md:px-8 lg:px-16">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <img className="w-28" src={images} alt="logoDark" />
          </Link>
        </div>
        <button
          onClick={handleToggleNavLinks}
          className="lg:hidden block text-2xl focus:outline-none"
        >
          ☰
        </button>
        <div
          className={`lg:flex items-center gap-8 justify-center flex-grow ${
            showNavLinks ? "flex" : "hidden"
          }`}
        >
          <ul className="lg:flex item-center gap-8">
            <Link to="/">
              <li className="text-base text-black font-bold hover:text-orange-900 hover:underline underline-offset-2 cursor-pointer duration-300">
                Home
              </li>
            </Link>
            <Link to="/shop">
              <li className="text-base text-black font-bold hover:text-orange-900 hover:underline underline-offset-2 cursor-pointer duration-300">
                Shop
              </li>
            </Link>
            <li
              className="text-base text-black font-bold hover:text-orange-900 hover:underline underline-offset-2 cursor-pointer duration-300"
              onClick={handleDeliveryAddressClick}
            >
              Shipping-Address
            </li>
          </ul>
        </div>
        <div className="flex items-center gap-8 ml-auto">
          <Link to="/cart">
            <div className="relative">
              <img className="w-6" src={cartImg} alt="cartImg" />
              <span className="absolute w-6 top-2 left-0 text-sm flex items-center justify-center font-semibold font-titleFont">
                {productData.length}
              </span>
            </div>
          </Link>

          {userInfo ? (
            <Link to="/login" className="flex items-center">
              <img
                className="w-8 h-8 rounded-full"
                src={userInfo.image}
                alt="userLogo"
              />
              <p className="text-base font-titleFont font-semibold underline underline-offset-2">
                {userInfo.name}
              </p>
            </Link>
          ) : (
            <Link to="/login" className="flex items-center">
              <FaLock style={{ marginRight: "4px" }} /> Login
            </Link>
          )}
        </div>
      </div>
      {/* <ToastContainer /> */}
    </div>
  );
};

export default Header;
