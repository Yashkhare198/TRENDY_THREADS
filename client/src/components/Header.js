import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { cartImg, images } from "../assets/index";

const Header = () => {
  const productData = useSelector((state) => state.trendy.productData);
  const userInfo = useSelector((state) => state.trendy.userInfo);

  return (
    <div className="w-full h-20 bg-yellow-400 font-titleFont border-b-[1px] border-b-gray-800 sticky top-0 z-50">
      <div className="max-w-screen-xl h-full flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <img className="w-28" src={images} alt="logoDark" />
          </Link>
        </div>
        <div className="flex items-center gap-8 justify-center flex-grow">
          <ul className="flex item-center gap-8">
            <Link to="/">
              <li className="text-base text-black font-bold hover:text-orange-900 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300">
                Home
              </li>
            </Link>
            <Link to="/shop">
              <li className="text-base text-black font-bold hover:text-orange-900 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300">
                Shop
              </li>
            </Link>
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

          <Link to="/login">
            <img
              className="w-8 h-8 rounded-full"
              src={
                userInfo
                  ? userInfo.image
                  : "https://images.pexels.com/photos/264547/pexels-photo-264547.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              }
              alt="userLogo"
            />
          </Link>

          {userInfo && (
            <p className="text-base font-titleFont font-semibold underline underline-offset-2">
              {userInfo.name}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
