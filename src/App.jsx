import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayOut from "./Pages/MainLayOut/MainLayOut";
import Home from "./Pages/Home/Home";
import Products from "./Pages/Products/Products";
import LogIn from "./Pages/LogIn/LogIn";
import Register from "./Pages/Register/Register";
import SignOut from "./Pages/SignOut/SignOut";
import Category from "./Pages/Category/Category";
import Cart from "./Pages/Cart/Cart";
import NotFound from "./Pages/NotFound/NotFound";
import CounterContextProvider from "./Components/Context/CounterContext";
import TokenContextProvider from "./Components/TokenContext/TokenContext";
import ProtctedRoutes from "./Components/ProtctedRoutes/ProtctedRoutes";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";
import { Offline, Online } from "react-detect-offline";
import { CiWifiOff } from "react-icons/ci";
import CartContextProvider from "./Components/Context/CartContext";
import { store } from "./redux/store";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";

import AllOrders from "./Pages/AllOrders/AllOrders";
import Brands from "./Pages/Brands/Brands";

import Wishlist from "./Pages/WishList/Wishlist";
import WishListContextProvider from "./Components/Context/WishListContext";
import ForgetPassword from "./Pages/ForgetPassword/ForgetPassword";
import RestPassword from "./Pages/RestPassword/RestPassword";
import NewPassword from "./Pages/NewPassword/NewPassword";
import UserOrder from "./Pages/UserOrder/UserOrder";
import ViewCart from "./Pages/ViewCart/ViewCart";
import CategoryProducts from "./Pages/CategoryProducts/CategoryProducts";
import CheckOut from "./Pages/CheckOut/CheckOut";
import BrandsDetalis from './Pages/BrandsDetails/BrandsDetalis';

export default function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <MainLayOut />,
      children: [
        {
          index: true,
          element: (
            <ProtctedRoutes>
              <Home />
            </ProtctedRoutes>
          ),
        },
        {
          path: "Products",
          element: (
            <ProtctedRoutes>
              <Products />
            </ProtctedRoutes>
          ),
        },
        { path: "Login", element: <LogIn /> },
        { path: "register", element: <Register /> },

        { path: "signOut", element: <SignOut /> },
        {
          path: "Category",
          element: (
            <ProtctedRoutes>
              <Category />
            </ProtctedRoutes>
          ),
        },

        {
          path: "brands",
          element: (
            <ProtctedRoutes>
              <Brands />
            </ProtctedRoutes>
          ),
        },

        {
          path: "brandsDetalis/:brandId",
          element: (
            <ProtctedRoutes>
              <BrandsDetalis />
            </ProtctedRoutes>
          ),
        },

        {
          path: "Cart",
          element: (
            <ProtctedRoutes>
              <Cart />
            </ProtctedRoutes>
          ),
        },

        {
          path: "wishlist",
          element: (
            <ProtctedRoutes>
              <Wishlist />
            </ProtctedRoutes>
          ),
        },

        {
          path: "forgetpassword",
          element: <ForgetPassword />,
        },

        {
          path: "resetPassword",
          element: <RestPassword />,
        },

        {
          path: "newPassword",
          element: <NewPassword />,
        },

        {
          path: "checkout",
          element: (
            <ProtctedRoutes>
              <CheckOut />
            </ProtctedRoutes>
          ),
        },

        {
          path: "allorders",
          element: (
            <ProtctedRoutes>
              <AllOrders />
            </ProtctedRoutes>
          ),
        },

        {
          path: "userorder/:userId",
          element: (
            <ProtctedRoutes>
              <UserOrder />
            </ProtctedRoutes>
          ),
        },

        {
          path: "productdetails/:productId",
          element: (
            <ProtctedRoutes>
              <ProductDetails />
            </ProtctedRoutes>
          ),
        },

        {
          path: "categoryProducts/:categoryId",
          element: (
            <ProtctedRoutes>
              <CategoryProducts />
            </ProtctedRoutes>
          ),
        },

        {
          path: "/ViewCart/:cartId",
          element: (
            <ProtctedRoutes>
              <ViewCart />
            </ProtctedRoutes>
          ),
        },

        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  const queryClient = new QueryClient();

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <TokenContextProvider>
          <WishListContextProvider>
            <CartContextProvider>
              <CounterContextProvider>
                <Offline>
                  <div className="offline fixed bottom-2 right-4 bg-slate-100 p-2 font-medium rounded-lg z-50 flex justify-between items-center gap-2">
                    <CiWifiOff />
                    You are now offline
                  </div>
                </Offline>
                <Toaster position="bottom-right" />
                <RouterProvider router={routes}></RouterProvider>
              </CounterContextProvider>
            </CartContextProvider>
          </WishListContextProvider>
        </TokenContextProvider>
      </QueryClientProvider>
    </Provider>
  );
}
