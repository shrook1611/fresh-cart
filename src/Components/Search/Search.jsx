import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { FaCartShopping, FaHeart, FaRegHeart, FaStar } from "react-icons/fa6";
import { MdFavoriteBorder } from "react-icons/md";

import * as Yup from "yup";
import { Link } from "react-router-dom";
export default function Search() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [input, setInput] = useState("");

  const initialValues = {
    name: "",
  };

  async function handelSearchProduct(values) {
    await axios
      .get(
        `https://ecommerce.routemisr.com/api/v1/products`
      )
      .then((res) => {
        if (!values.name.trim()) {
          setError("Please enter a valid search term.");
          return;
        }
        if (res.data && res.data.data) {
          setProducts(res.data.data);

          console.log("API Response: ", res.data);
        }else {
            setProducts([]);
            setError("No products found.");
          }
      })
      .catch((err) => err);
  }

  console.log(products);

  const filterdProducts = products.filter((product) => {
    return product.title.toLowerCase().includes(input.toLowerCase())
  });

  const formik = useFormik({
    initialValues,

    onSubmit: (values) => {
      console.log("Form values:", values);
      handelSearchProduct(values);
    },
  });

  return (
    <>
      <div className="p-5 m-5">
        <form className="w-1/2 mx-auto" onSubmit={formik.handleSubmit}>
          <div className="mb-5">
            <label
              htmlFor="search"
              className="block mb-2  font-bold text-md capitalize text-gray-900 dark:text-white"
            >
              search
            </label>
            <input
              type="text"
              id="search"
              name="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="search"
              onChange={(e) => {
                formik.handleChange(e);
                setInput(e.target.value);
              }}
              value={formik.values.name}
              onBlur={formik.handleBlur}
            />
          </div>

          {formik.touched.name && formik.errors.name ? (
            <div className="text-red-500">{formik.errors.name}</div>
          ) : null}
        </form>
      </div>

      <div className="row">
        {filterdProducts.length > 0 &&
          filterdProducts.map((product) => {
            {
              console.log(product);
            }
            return (
              <div key={product.id} className="w-1/5">
                <div className="product cursor-pointer p-4 mb-2 border border-transparent rounded-md relative">
                  <Link to={`/productdetails/${product.id}`}>
                    {console.log(product)}
                    <div className="inner">
                      <img
                        src={product.imageCover}
                        alt={product.tittle}
                        className="w-full h-[300px]"
                      />
                      <h5 className=" text-l  font-semibold text-green-500">
                        {product.category.name}
                      </h5>
                      <p className="text-gray-500">
                        {product.title.split(" ").splice(0, 3).join(" ")}
                      </p>
                      <div className="row justify-between items-center">
                        <small>{product.price}EGP</small>
                        <div className="flex  gap-2 justify-center items-center">
                          <FaStar />
                          <span className="">{product.ratingsAverage}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                  <button
                    onClick={() => {
                      addProduct(product.id);
                    }}
                    className="btn w-full flex justify-between items-center font-semibold "
                  >
                    Add to cart <FaCartShopping />{" "}
                  </button>

                  <button
                    onClick={() => {
                      addWish(product.id);
                    }}
                    className={
                      "text-2xl absolute top-0 right-0 font-semibold cursor-pointer"
                    }
                  >
                    <MdFavoriteBorder />
                  </button>

                  {/* <button
                    className={`wishlist-toggle ${
                      wishlistState ? "active" : ""
                    }`}
                    onClick={() => {
                      toggleWishlist(product.id);
                    }}
                  >
                    {wishlistState ? (
                      <FaHeart className="heart-icon active-heart" />
                    ) : (
                      <FaRegHeart className="heart-icon" />
                    )}
                  </button> */}





                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}
