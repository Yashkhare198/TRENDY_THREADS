import React, { useState } from "react";
import { images, logoLight, paymentLogo } from "../assets";
import {
  
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaHome,
} from "react-icons/fa";
import {ImGithub} from "react-icons/im";
import { MdLocationOn } from "react-icons/md";
import { BsConeStriped } from "react-icons/bs";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [popupMessage, setPopupMessage] = useState("");

  const showInProgressMessage = (message) => {
    setPopupMessage(message);
  };

  const handleSubscribe = () => {
    if (/^\S+@\S+\.\S+$/.test(email)) {
      alert(`Subscribed with email: ${email}`);
      setEmail("");
    } else {
      alert("Please enter a valid email address.");
    }
  };

  const PopupMessage = ({ message, onClose }) => {
    return (
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-500 border-4 border-black p-12 rounded-lg shadow-lg text-white">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <p className="text-xl">{message}</p>
            <BsConeStriped size={32} color="black" />
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-300 focus:outline-none transition-transform transform hover:scale-105 absolute top-2 right-2 bg-red-700 p-2 rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-black text-white py-6 font-titleFont">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
        <div className="flex flex-col gap-3 text-center md:text-left">
          <img className="w-32 mx-auto md:mx-0" src={images} alt="logoLight" />
          <p className="text-sm tracking-wide text-center md:text-left">
            © YashKhare1998
          </p>
          <div className="flex justify-center md:justify-start gap-5 text-lg">
            {/* Social media links */}
            <a
              href="https://github.com/YashKhare198"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ImGithub className="hover:text-white duration-300 cursor-pointer" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
              <FaYoutube className="hover:text-white duration-300 cursor-pointer" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebookF className="hover:text-white duration-300 cursor-pointer" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="hover:text-white duration-300 cursor-pointer" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="hover:text-white duration-300 cursor-pointer" />
            </a>
          </div>
        </div>
        <div className="text-center md:text-left">
          <h2 className="text-xl font-semibold mb-4">Locate Us</h2>
          <p>Pune, India</p>
          <p>Mobile: +91 98351738921</p>
          <p>Phone: +91 95174927499</p>
          <p>e-mail: trendy_threads@gmail.com</p>
        </div>
        <div className="text-center md:text-left">
          <h2 className="text-xl font-semibold mb-4">Profile</h2>
          <p
            className="flex items-center gap-3 hover:text-white duration-300 cursor-pointer"
            onClick={() => showInProgressMessage("Work in Progress")}
          >
            <span className="text-lg">
              <FaHome />
            </span>
            Order Tracking
          </p>
          <p
            className="flex items-center gap-3 hover-text-white duration-300 cursor-pointer"
            onClick={() => showInProgressMessage("Work in Progress")}
          >
            <span className="text-lg">
              <MdLocationOn />
            </span>
            Help & Support
          </p>
        </div>
        <div className="text-center md:text-left">
          <input
            className="bg-transparent border px-4 py-2 text-sm w-48"
            type="text"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            className="text-sm border text-white border-t-0 hover:bg-gray-900 active:bg-white active:text-black"
            onClick={handleSubscribe}
          >
            Subscribe
          </button>
        </div>
      </div>

      {popupMessage && <PopupMessage message={popupMessage} onClose={() => setPopupMessage("")} />}
    </div>
  );
};

export default Footer;
