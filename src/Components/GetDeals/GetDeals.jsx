import React from "react";
import { Link } from "react-router-dom";

export default function GetDeals() {
  return (
    <div className="h-full">
      <div className='bg-[url("assets/slider-2.jpeg")] bg-cover bg-center  h-[300px]  flex  items-center'>
        <div className=" flex  ms-3 mt-5 flex-col md:w-1/4 sm:w-1/3 p-5 ">
          <h2 className="text-xl mb-2  text-green-700 font-bold capitalize">
            Get top deals, latest trends, and more.
          </h2>
          <small className="mb-2">
            Join our email subscription now to get updates on promotions and
            coupons.
          </small>
          <Link to={"/products"}>
            <button className="btn"> Click here</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
