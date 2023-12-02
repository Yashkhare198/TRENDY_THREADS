import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAuth } from "firebase/auth"; // Import getAuth from Firebase Auth
import { useSelector } from "react-redux";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { FaExternalLinkSquareAlt } from "react-icons/fa";

function DeliveryAddress() {
  const [address, setAddress] = useState({
    name: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    phone: "",
  });

  const db = getFirestore();
  const user = useSelector((state) => state.trendy.userInfo); // Get the logged-in user
  const auth = getAuth(); // Firebase Auth instance

  // Use useEffect to fetch the email and set it in the address
  useEffect(() => {
    if (user) {
      setAddress((prevAddress) => ({
        ...prevAddress,
        email: user.email,
      }));
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });

    // Clear the respective error when the field value changes
    if (name === "email") {
      setErrors({ ...errors, email: "" });
    }
    if (name === "phone") {
      setErrors({ ...errors, phone: "" });
    }
  };
  //   const saveDataToFirestore = async () => {
  //     try {
  //       const docRef = await addDoc(collection(db, 'deliveryAddresses'), {
  //         name: address.name,
  //         email: address.email,
  //         phone: address.phone,
  //         street: address.street,
  //         city: address.city,
  //         state: address.state,
  //         postalCode: address.postalCode,
  //       });
  //       console.log('Document written with ID: ', docRef.id);
  //       toast.success('Data saved to Firestore successfully!');
  //     } catch (e) {
  //       console.error('Error adding document: ', e);
  //       toast.error('Error saving data to Firestore.');
  //     }
  //   };

  const validateEmail = (email) => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Please enter a valid email address.",
      }));
    }
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^\d{10}$/; // Ensure exactly 10 digits
    if (!phoneRegex.test(phone)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        phone: "Phone should contain exactly 10 digits.",
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
     if (!address.name || !address.email || !address.phone || !address.street || !address.city || !address.state || !address.postalCode) {
    toast.error("All fields are required.");
    return;
  }
  }

    validateEmail(address.email);
    validatePhone(address.phone);

    if (errors.email || errors.phone) {
      return;
    }

    // Send the address data to your Node.js backend for storage in Firebase.
    // You can use the Fetch API or a library like Axios for making POST requests.
    // saveDataToFirestore();
  };

  //   const getData = async (e) => {
  //     fetch("https://trendy-threads-3f890-default-rtdb.firebaseio.com/UserData.json")
  //       .then((response) => response.json())
  //       .then((data) => {
  //         if (data) {
  //           // Convert the response data to an array of objects
  //           const userDataArray = Object.values(data);

  //     const { name, email, phone, street, city, state, postalCode } = address;

  //     e.preventDefault();
  //     const matchingUser = userDataArray.find((user) => user.email === userInfo.email);

  //     if(!matchingUser)
  //     {
  //     const options = {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "aplication/json",
  //       },
  //       body: JSON.stringify({
  //         name,
  //         email,
  //         phone,
  //         street,
  //         city,
  //         state,
  //         postalCode,
  //       }),
  //     };
  //     const res = await fetch(
  //       "https://trendy-threads-3f890-default-rtdb.firebaseio.com/UserData.json",
  //       options
  //     );
  //     if (res) {
  //       alert("Data added");
  //     } else {
  //         alert('Error occured');
  //     }
  // }
  // else{
  //     const options = {
  //         method: "PATCH",
  //         headers: {
  //           "Content-Type": "aplication/json",
  //         },
  //         body: JSON.stringify({
  //           name,
  //           email,
  //           phone,
  //           street,
  //           city,
  //           state,
  //           postalCode,
  //         }),

  //     }
  // const res = await fetch(
  //     "https://trendy-threads-3f890-default-rtdb.firebaseio.com/UserData.json",
  //     options
  //   );
  //   if (res) {
  //     alert("Data Updated");
  //   } else {
  //       alert('Error occured');
  //   }
  //   };

  const getData = async (e) => {
    e.preventDefault();
  
        const { name, email, phone, street, city, state, postalCode } = address;
       
            const options = {
              method: "POST",
              headers: {
                "Content-Type": "application/json", // Corrected "aplication" typo
              },
              body: JSON.stringify({
                name,
                email,
                phone,
                street,
                city,
                state,
                postalCode,
              }),
            };
            const res = await fetch(
              "https://trendy-threads-3f890-default-rtdb.firebaseio.com/UserData.json",
              options
            );
            if (res.ok) {
              alert("Data added");
            } else {
              alert("Error occurred");
            }
          
        }
      

  

  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Delivery Address
      </h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md border border-black border-opacity-50 rounded-lg p-8 mb-4"
      >
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your full name"
            value={address.name}
            onChange={handleInputChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={user.email}
            // onChange={handleInputChange}
            onBlur={() => validateEmail(address.email)}
            required
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.email && "border-red-500"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs italic">{errors.email}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="phone"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Mobile No.
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="Enter your mobile no."
            value={address.phone}
            onChange={handleInputChange}
            onBlur={() => validatePhone(address.phone)}
            pattern="[0-9]*"
            required
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.phone && "border-red-500"
            }`}
          />
          {errors.phone && (
            <p className="text-red-500 text-xs italic">{errors.phone}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="street"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Street
          </label>
          <input
            type="text"
            id="street"
            name="street"
            placeholder="Enter street address"
            value={address.street}
            onChange={handleInputChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="city"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            placeholder="Enter city"
            value={address.city}
            onChange={handleInputChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="state"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            State
          </label>
          <input
            type="text"
            id="state"
            name="state"
            placeholder="Enter state"
            value={address.state}
            onChange={handleInputChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="postalCode"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Postal Code
          </label>
          <input
            type="text"
            id="postalCode"
            name="postalCode"
            placeholder="Enter postal code"
            value={address.postalCode}
            onChange={handleInputChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover-bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={getData}
          >
            Submit
          </button>
        </div>
      </form>
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
}

export default DeliveryAddress;
