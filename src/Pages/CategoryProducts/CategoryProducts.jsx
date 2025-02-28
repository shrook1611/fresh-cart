import React, { useContext } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { FaCartShopping, FaHeart, FaRegHeart, FaStar } from "react-icons/fa6";
import { CartContext } from "./../../Components/Context/CartContext";

import toast from "react-hot-toast";

export default function CategoryProducts() {
  const { categoryId } = useParams();

  const { addTocart, setNOfCartItems, setCartId } = useContext(CartContext);

  async function getAllProductsCategory() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  const { data, error, isLoading } = useQuery({
    queryKey: ["allProductCategory"],
    queryFn: getAllProductsCategory,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching categories</div>;

  let allProductCategory = data?.data?.data;

  

  const filterdProducts = allProductCategory.filter((product) => {
    return product.category._id === categoryId;
  });

  console.log(filterdProducts);
 
//   console.log("Category ID: ", categoryId);
//   console.log("All Products: ", allProductCategory);

  async function addProduct(id) {
    const res = await addTocart(id);

    if (res.status == "success") {
      setNOfCartItems(res.numOfCartItems);
      setCartId(res.cartId);
      toast.success(res.message, {
        style: { fontWeight: "bold", color: "green" },
      });
    } else {
      toast.error("somthing went wrong");
    }
  }

  return (
     <>
   
     
          <div className="row">

            
          
            {filterdProducts ? (
              filterdProducts.map((product) => {
                return (
                  <div
                    className="sm:w-full md:w-1/2  lg:w-1/3 xl:w-1/5"
                    key={product.id}
                  >
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
                    </div>
                  </div>
                );
              })
            ) : (
              <div>
                <h2>No item Found</h2>
              </div>
            )}
          </div>
        </>
   
  );
}
