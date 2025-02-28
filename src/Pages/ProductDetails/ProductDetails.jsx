import React, { useContext, useState } from "react";
import styles from "./ProductDetails.module.css";
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaStar, FaCartShopping } from "react-icons/fa6";
import Slider from "react-slick";
import { CartContext } from "../../Components/Context/CartContext";
import toast from "react-hot-toast";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
};

export default function ProductDetails() {
  const { productId } = useParams();
  const [productDetail, setProductDetail] = useState([]);

  const { addTocart, setNOfCartItems, setCartId } = useContext(CartContext);

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
    console.log(res);
  }

  async function getProductDetails() {
    await axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${productId}`)
      .then((res) => {
        setProductDetail(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getProductDetails();
  }, []);

  return (
    <div className="row justify-center items-center">
      <div className="md:w-1/4 sm:w-full mb-10">
        <Slider {...settings}>
          {productDetail.images?.map((img, index) => {
            return (
              <div className="" key={index}>
                <img src={img} alt={productDetail.title} key={index} />
              </div>
            );
          })}
        </Slider>
      </div>
      <div className="md:w-3/4  sm:w-full p-4">
        <div className="inner">
          <h2 className="text-green-600 font-semibold">
            {productDetail.title}
          </h2>
          <small>{productDetail.description}</small>
          <p className="text-grayFP-700 font-semibold">
            {productDetail.category?.name}
          </p>
          <div className="row justify-between items-center">
            <small>{productDetail.price}EGP</small>
            <div className="flex  gap-2 justify-center items-center">
              <FaStar />
              <span className="">{productDetail.ratingsAverage}</span>
            </div>
          </div>
          <button
            className="btn w-full flex justify-center gap-3 text-lg items-center font-semibold "
            onClick={() => {
              addProduct(productDetail.id);
            }}
          >
            Add to cart <FaCartShopping />{" "}
          </button>
        </div>
      </div>
    </div>
  );
}
