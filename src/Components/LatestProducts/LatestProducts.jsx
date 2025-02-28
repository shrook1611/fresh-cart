import React, { useContext } from "react";
import styles from "./LatestProducts.module.css";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { FaStar } from "react-icons/fa6";
import ProductItem from "./../ProductItem/ProductItem";
import Loader from "../Loader/Loader";
import toast from "react-hot-toast";
import { CartContext } from "../Context/CartContext";
import { WishContext } from "../Context/WishListContext";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa6";

export default function LatestProducts() {
  const { addTocart, setNOfCartItems, setCartId } = useContext(CartContext);
  const { addToWishList, getLoggedWishItems, getWishItem, removeWishItem } =
    useContext(WishContext);
  const [products, setProducts] = useState([]);

  const [wishListClicked, setWishListClicked] = useState([]);
  const [searchLetter, setSearchLetter] = useState([])






  
  async function getProduct() {
    await axios
      .get("https://ecommerce.routemisr.com/api/v1/products")
      .then((res) => {
        setProducts(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }




  async function getWishListProduct() {
    const data = await getLoggedWishItems();

    console.log(data, "shrook");

    const wishProducts = data.data.map((product) => product._id);
    console.log(wishProducts);
    setWishListClicked(wishProducts);
  }

  useEffect(() => {
    getProduct();
    getWishListProduct();
  }, []);

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
    // console.log(res);
  }

  async function addWish(id) {
    const res = await addToWishList(id);

    //
    console.log(res);

    if (res.status == "success") {
      getLoggedWishItems();
      getWishItem();

      toast.success(res.message, {
        style: { fontWeight: "bold", color: "green" },
      });
    } else {
      toast.error("somthing went wrong");
    }
  }
  const selectedProducts = products.slice(0, 10);

  async function toggleWishList(id) {
    if (wishListClicked.includes(id)) {
      let data = await removeWishItem(id);
      toast.success(data.message, {
        style: { fontWeight: "bold", color: "red" },
      });
      console.log(data.data);
      setWishListClicked(data.data)
    } else {
      let data = await addToWishList(id);
      toast.success(data.message, {
        style: { fontWeight: "bold", color: "green" },
      });
      console.log(data);
      setWishListClicked(data.data)
    }
  }

  return (
    <div className="relative">
      <div>
        <h2 className="text-green-700 font-bold text-4xl  my-10 capitalize ">
          <span className="text-sm">
            <FaHeart className="text-red-700 inline" />
          </span>{" "}
          <span className="text-sm">
            <FaHeart className="text-red-700 inline" />
          </span>{" "}
          new arrival{" "}
          <span className="text-sm">
            <FaHeart className="text-red-700 inline" />{" "}
          </span>{" "}
          <span className="text-sm">
            <FaHeart className="text-red-700 inline" />
          </span>{" "}
        </h2>
      </div>

      <input
              type="text"
              id="search"
              name="name"
              className="bg-gray-50 w-[70%]  mx-auto  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block my-5  p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="search"
             onClick={(e)=>{setSearchLetter(e.target.value)}}
            />


      <div className="row justify-center items-center ">
        {products.length > 0 ? (
          selectedProducts.map((product, index) => {
            return (
              <div
                className=" gap-2 w-full sm:w-full md:w-1/2 lg:w-1/4 xl:w-1/6"
                key={product.id}
              >
                <ProductItem
                  product={product}
                  addProduct={addProduct}
                  addWish={addWish}
                  wishListClicked={wishListClicked}
                  toggleWishList={toggleWishList}
                />
              </div>
            );
          })
        ) : (
          <Loader />
        )}
      </div>
      <Link
        to={"/products"}
        className="bg-gray-200 absolute bottom-20 right-20 capitalize rounded-2xl p-2"
      >
        {" "}
        see more...
      </Link>
    </div>
  );
}
