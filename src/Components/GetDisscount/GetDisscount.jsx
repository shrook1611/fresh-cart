import React from "react";
import img from "./../../assets/store-graphics.svg";
import { Link } from "react-router-dom";
export default function GetDisscount() {
  return (
    <div className=" flex items-center justify-between py-20 m-20 bg-[#F0F3F2] rounded-xl">
      <div className="md:w-1/2 sm:w-full p-6">
        <h2 className="text-2xl font-bold my-2">One Stop Grocery Shop</h2>
        <p className="text-gray-700 lead mb-3">
          Shopping for your furry friend? Find food,
          
          <br/>
           treats, and more in one
          easy spot.

        </p>

     <Link to={'/products'}>   <button className="btn">Get Disccount</button></Link>
      </div>

      <div className="md:w-1/2  sm:w-full">
        <img src={img} alt="discount" className="w-full" />
      </div>

      {/* <div class="bg-[url('assets/store-graphics.svg')] bg-cover bg-center h-[400px]"></div> */}
    </div>
  );
}
