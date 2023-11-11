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
  const [totalAmt, setTotalAmt] = useState(0);
  const [shippingAddresses, setShippingAddresses] = useState([]);
  const [selectedShippingAddress, setSelectedShippingAddress] = useState(null);

  useEffect(() => {
    let price = 0;
    productData.forEach((item) => {
      price += item.price * item.quantity;
    });
    setTotalAmt(parseFloat(price.toFixed(2)));

    if (userInfo && userInfo.email) {
      // Fetch the user's shipping addresses from Firestore
      fetchShippingAddresses(userInfo.email);
    }
  }, [productData, selectedShippingAddress]);

  const fetchShippingAddresses = (loggedInEmail) => {
    // Make the API request to fetch the user's shipping addresses
    fetch(process.env.REACT_APP_FIREBASE_FETCH)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          // Convert the response data to an array of objects
          const userDataArray = Object.values(data);

          // Filter addresses with the matching email
          const matchingAddresses = userDataArray.filter(
            (user) => user.email === userInfo.email
          );

          if (matchingAddresses.length > 0) {
            // Set the shipping addresses in the component state
            setShippingAddresses(matchingAddresses);

            // Initialize the selected address with the first one
            if (!selectedShippingAddress) {
              setSelectedShippingAddress(matchingAddresses[0]);
            }
          } else {
            // No matching addresses found
            console.log("No addresses with the logged-in email found.");
          }
        } else {
          // No data available
          console.log("No user data available.");
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  };

  const handlePayment = async (token) => {
    if (selectedShippingAddress) {
      try {
        // Send the token and selected address to your server for processing
        const response = await axios.post(
          process.env.REACT_APP_SERVER_STRIPE,
          {
            amount: Math.round(totalAmt * 100), // Convert the amount to cents
            token: token.id, // Extract the token ID
            shippingAddress: selectedShippingAddress,
          }
        );

        // Handle success case, e.g., show a confirmation message to the user
        toast.success("Payment successful. Thank you for your order!");
      } catch (error) {
        // Handle error cases, e.g., show an error message to the user
        console.error("Error processing payment:", error);
        toast.error("Payment failed. Please try again later.");
      }
    } else {
      toast.error("Please select or add a shipping address before proceeding to checkout.");
    }
  };

  const handleCheckout = () => {
    if (userInfo && selectedShippingAddress) {
      setPayNow(true);
    } else if (userInfo && !selectedShippingAddress) {
      toast.error("Please select a shipping address or enter a new one");
    } else {
      toast.error("Please select a shipping address and sign in to Checkout");
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
        <div className="max-w-screen-xl mx-auto py-20 flex flex-wrap">
          <CartItem />
          <div className="w-full sm:w-1/2 lg:w-1/3 bg-[#fafafa] py-6 px-4 relative">
            <div className="flex flex-col gap-6 border-b-[1px] border-b-gray-400 pb-6">
              <h2 className="text-2xl font-medium">Cart Totals</h2>
              <p className="flex items-center gap-4 text-base">
                Subtotal{" "}
                <span className="font-titleFont font-bold text-lg">
                  ${totalAmt}
                </span>
              </p>
              <p className="flex items-start gap-4 text-base relative">
                <div className="flex items-start gap-4 text-base relative">
                  <h2 className="text-2xl font-medium">Shipping Address</h2>
                  {userInfo && (
                    <div className="w-full">
                      <select
                        className="border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
                        onChange={(e) => {
                          const selectedId = e.target.value;
                          const selectedAddress = shippingAddresses.find(
                            (address) => address.id === selectedId
                          );
                          setSelectedShippingAddress(selectedAddress);
                        }}
                      >
                        {shippingAddresses.map((address) => (
                          <option key={address.id} value={address.id}>
                            {address.street}, {address.city}, {address.state},{" "}
                            {address.postalCode}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              </p>
            </div>
            <p className="font-titleFont font-semibold flex justify-between mt-6">
              Total <span className="text-xl font-bold">${totalAmt}</span>
            </p>
            <button
              onClick={handleCheckout}
              className="text-base bg-black text-white w-full py-3 mt-6 hover:bg-gray-800 hover-text-white duration-300"
            >
              Proceed to Checkout
            </button>

            {payNow && (
              <div className="mt-6 flex items-center justify-center">
                <StripeCheckout
                  stripeKey={process.env.REACT_APP_STRIPE_PUBLIC_KEY}
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
            <button className="flex items-center gap-1 text-gray-400 hover-text-black duration-300">
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
