import React, { useContext, useState } from "react";

import { data, Link, useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";

import axios from "axios";
import { tokenContext } from "../../Components/TokenContext/TokenContext";
import { CartContext } from "../../Components/Context/CartContext";
import Cart from "../Cart/Cart";

export default function CheckOut() {
  const [error, setError] = useState(null);

  const { state } = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const {
    cashOnDilvery,
    setNOfCartItems,
    setCartId,
    onlinPayment,
    userId,
    cartId,
  } = useContext(CartContext);
  const { setToken } = useContext(tokenContext);
  const navigate = useNavigate();
  const initialValues = {
    details: "",
    phone: "",
    city: "",
  };

  async function handleSubmit(data) {
    if (state == "cash") {
      const res = await cashOnDilvery(data);

      if (res.status) {
        setNOfCartItems(0);
        navigate(`/Userorder/${userId}`);
        setCartId(cartId);
      }
    } else {
      let response = await onlinPayment({ shippingAddress: data });
      if (response.status === "success") {
        window.location.href = response.session.url;
      }

      console.log(response.session.url);
    }
  }

  const formik = useFormik({
    initialValues,

    onSubmit: () => {
      handleSubmit();
    },
  });

  return (
    <div>
      <section className="bg-gray-50 w-1/2 mx-auto shadow p-3  pt-8">
        <h1 className="font-bold text-green-600 my-2 text-3xl text-center">
          Checkout Now{" "}
        </h1>

        {error && <div className="bg-red-400 p-3 rounded-lg">{error}</div>}
        <form className="w-1/2 mx-auto" onSubmit={formik.handleSubmit}>
          <div className="mb-5">
            <label
              htmlFor="details"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your details
            </label>
            <input
              type="text"
              id="details"
              name="details"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter your details"
              onChange={formik.handleChange}
              value={formik.values.details}
              onBlur={formik.handleBlur}
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="phone"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter your phone"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="city"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your city
            </label>
            <input
              type="text"
              id="city"
              name="city"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter your city"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.city}
            />
          </div>

          {isLoading ? (
            <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 disabled:bg-blue-300 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
              loadinig....
            </button>
          ) : (
            <button disabled={!formik.isValid} type="submit" className="btn">
              PayNow
            </button>
          )}
        </form>
      </section>
    </div>
  );
}
