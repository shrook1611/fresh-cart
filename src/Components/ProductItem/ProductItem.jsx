import React, { useEffect, useState } from "react";
import styles from "./ProductItem.module.css";
import { FaCartShopping, FaHeart, FaRegHeart, FaStar } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { MdFavoriteBorder } from "react-icons/md";

export default function ProductItem({ product, addProduct, wishListClicked,toggleWishList }) {
 

 

 
  return (
    <div>
      <div className="product cursor-pointer p-4 mb-2 border border-transparent rounded-md relative">
        <Link to={`/productdetails/${product.id}`}>
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
          onClick={() => {toggleWishList(product.id)}}
          className={
            "text-2xl absolute top-0 right-0 font-semibold cursor-pointer p-2"
          }
        >
          <FaHeart
            className={`${wishListClicked.includes(
              product.id
            )?'text-red-500':""}`}
          />
        </button>
      </div>
    </div>
  );
}
