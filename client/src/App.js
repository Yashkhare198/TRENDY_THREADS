import React from "react";
import Shop from "./pages/shop";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Product from "./components/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  ScrollRestoration,
} from "react-router-dom";
import { productsData } from "./api/Api";

const Layout = () => {
  return (
    <div>
      <Header />
      <ScrollRestoration /> {/* To bring to the top */}
      <Outlet />
      <Footer />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: productsData,
       
      },
      {
        path: "/shop",
        element: <Shop />,
        loader: productsData,
      },

      {
        path: "/product/:id",
        element: <Product />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path:"/login",
        element:<Login />
      },
    ],
  },
]);

function App() {
  return (
    <div className="font-bodyFont">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
