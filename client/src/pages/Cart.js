import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

const Cart = () => {
  const productData = useSelector((state) => state.trendy.productData);
  const userInfo = useSelector((state) => state.trendy.userInfo);
  const [payNow, setPayNow] = useState(false);
  const [totalAmt, setTotalAmt] = useState("");

  useEffect(() => {
    let price = 0;
    productData.forEach((item) => {
      price += item.price * item.quantity;
    });
    setTotalAmt(parseFloat(price.toFixed(2)));
  }, [productData]);

  const handlePayment = async (token) => {
    try {
      // Send the token to your server for processing
      const response = await axios.post("http://localhost:8000/create-payment-intent", {
        amount: totalAmt * 100, // Convert the amount to cents
        token: token.id, // Extract the token ID
      });

      // Handle success case, e.g., show a confirmation message to the user
      toast.success("Payment successful. Thank you for your order!");
    } catch (error) {
      // Handle error cases, e.g., show an error message to the user
      toast.error("Payment failed. Please try again later.");
    }
  };

  const handleCheckout = () => {
    if (userInfo) {
      setPayNow(true);
    } else {
      toast.error("Please sign in to Checkout");
    }
  };

  return (
    <div>
      <img
        className="w-full h-60 object-cover"
        src="https://images.pexels.com/photos/1435752/pexels-photo-1435752.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="cartImg"
      />
      {productData.length > 0 ? (
        <div className="max-w-screen-xl mx-auto py-20 flex">
          <CartItem />
          <div className="w-1/3 bg-[#fafafa] py-6 px-4">
            <div className="flex flex-col gap-6 border-b-[1px] border-b-gray-400 pb-6">
              <h2 className="text-2xl font-medium">Cart Totals</h2>
              <p className="flex items-center gap-4 text-base">
                Subtotal{" "}
                <span className="font-titleFont font-bold text-lg">
                  ${totalAmt}
                </span>
              </p>
              <p className="flex items-start gap-4 text-base">
                Shipping{" "}
                <span>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Quos, veritatis.
                </span>
              </p>
            </div>
            <p className="font-titleFont font-semibold flex justify-between mt-6">
              Total <span className="text-xl font-bold">${totalAmt}</span>
            </p>
            <button
              onClick={handleCheckout}
              className="text-base bg-black text-white w-full py-3 mt-6 hover:bg-gray-800 duration-300"
              disabled={payNow}
            >
              Proceed to Checkout
            </button>
            {payNow && (
              <div className="w-full mt-6 flex items-center justify-center">
                <StripeCheckout
                  stripeKey="pk_test_51NzBh2SDSfLweOQGR0Sx3UE22ktA8hLes0mWyA8xo1cR8SlGy7YRHdKB30WWdgvmUEuH2SGkRQUeGHKuawKklAfE00WXF02DOh"
                  name="Trendy Threads Online Shopping"
                  amount={totalAmt * 100}
                  label="Pay to Trendy Threads"
                  description={`Your Payment amount is $${totalAmt}`}
                  token={handlePayment}
                  email={userInfo.email}
                />
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="max-w-screen-xl mx-auto py-10 flex flex-col items-center gap-2 justify-center">
          <p className="text-xl text-orange-600 font-titleFont font-semibold">
            Your Cart is Empty. Please go back to Shopping and add products to
            Cart.
          </p>
          <Link to="/">
            <button className="flex items-center gap-1 text-gray-400 hover:text-black duration-300">
              <span>Go Shop!</span>
            </button>
          </Link>
        </div>
      )}
      <ToastContainer
        position="top-left"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default Cart;
