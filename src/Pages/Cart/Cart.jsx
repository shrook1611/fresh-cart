import React, { useEffect, useState } from "react";
import styles from "./Cart.module.css";
import { useContext } from "react";
import { CartContext } from "../../Components/Context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import Loader from "./../../Components/Loader/Loader";
import { FaTrashAlt } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { VscClearAll } from "react-icons/vsc";
export default function Cart() {
  const [cartData, setCartData] = useState([]);
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const {
    getLoggedcartItems,
    removeCartItem,
    updateCartProducts,
    clearcartProducts,
    setNOfCartItems,
    setCartId,
  } = useContext(CartContext);
  async function getData() {
    const data = await getLoggedcartItems();
    setCartData(data.data);
  }
  async function deleteItem(id) {
    const response = await removeCartItem(id);
    setCartData(response.data);
    setNOfCartItems(response.numOfCartItems);
    setCartId(response.cartId);
  }

  async function updateProduct(id, count) {
    let response = await updateCartProducts(id, count);
    setCartData(response.data);
  }

  async function clearCart() {
    const data = await clearcartProducts();
    setCartData(data);
    setNOfCartItems(data.numOfCartItems);
    setCartId(data.cartId);
    toast.success("cart cleard successfuly", {
      style: {
        border: "1px solid black",
      },
    });
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      {cartData ? (
        <div>
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-semibold text-green-600">
              shopping Cart
            </h3>
            {cartData && (
              <h4 className="font-semibold capitalize mx-2">
                totalPrice:
                <span className="font-bold text-green-500 mx-2">
                  {cartData.totalCartPrice ? cartData.totalCartPrice : "0"}
                  EGP
                </span>
              </h4>
            )}

            <div className="text-center my-5 font-xxl">
              <button
                onClick={() => {
                  clearCart();
                }}
              >
                <VscClearAll className=" text-white bg-red-600 font-xxl  font-bold" />
              </button>
            </div>
          </div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-16 py-3">
                    <span className="sr-only">Image</span>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Qty
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {cartData.products && cartData.products?.length > 0 ? (
                  cartData.products.map((product) => {
                    {
                    }
                    return (
                      <tr
                        key={product._id}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                      >
                        <td className="p-4">
                          <Link to={`/productdetails/${product.product?.id}`}>
                            <img
                              src={product.product?.imageCover}
                              className="w-16 md:w-32 max-w-full max-h-full"
                              alt="Apple Watch"
                            />
                          </Link>
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                          {product.product?.title}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <button
                              disabled={product.count === 1}
                              onClick={() => {
                                updateProduct(
                                  product.product?.id,
                                  product.count - 1
                                );
                              }}
                              className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                              type="button"
                            >
                              <span className="sr-only">Quantity button</span>
                              <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 18 2"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M1 1h16"
                                />
                              </svg>
                            </button>
                            <div>
                              <p>{product.count}</p>
                            </div>
                            {product.count > product.product.quantity ? (
                              toast.error("product not found")
                            ) : (
                              <button
                                onClick={() => {
                                  updateProduct(
                                    product.product?.id,
                                    product.count + 1
                                  );
                                }}
                                className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                type="button"
                              >
                                <span className="sr-only">Quantity button</span>
                                <svg
                                  className="w-3 h-3"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 18 18"
                                >
                                  <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 1v16M1 9h16"
                                  />
                                </svg>
                              </button>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                          {product.price}
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => {
                              deleteItem(product.product?.id);
                            }}
                            className="font-medium text-red-600 dark:text-red-500 hover:text-black text-2xl"
                          >
                            <FaTrashAlt className="" />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <div className="text-center w-full flex justify-center   flex-col  gap-4 items-center m-20 p-20">
                    <div>
                      <p className="font-bold text-xl capitalize text-green-700">
                        no items found in your Cart
                      </p>
                    </div>
                    <div>
                      <Link to={"/"}>
                        <button className="btn text-center">
                          continue shopping
                        </button>
                      </Link>
                    </div>
                  </div>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <Loader />
      )}

      {cartData.products && cartData.products?.length > 0 ? (
        <>
          <label htmlFor="paymentMethod" className=" text-green-600 font-bold ">
            {" "}
            choose your Payment Method :
          </label>
          <select
            name="paymentMethod"
            id="paymentMethod"
            onChange={(e) => {
              setPaymentMethod(e.target.value);
            }}
            className=" block m-4 w-1/2 border-2 rounded-2xl hover:border-green-500  "
          >
            <option value="cash">cash</option>

            <option value="online">online</option>
          </select>
        </>
      ) : (
        ""
      )}

      {cartData.products && cartData.products?.length > 0 ? (
        <button
          type="submit"
          className="btn w-full"
          onClick={() => {
            navigate("/checkout", { state: paymentMethod });
          }}
        >
          CheckOut
        </button>
      ) : (
        ""
      )}
    </div>
  );
}
