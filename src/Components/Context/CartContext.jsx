import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();
export default function CartContextProvider({ children }) {
  const headers = { token: localStorage.getItem("token") };
  const [nOfCartItems, setNOfCartItems] = useState(0);
  const [cartId, setCartId] = useState(null);

  const token = localStorage.getItem("token");

  const decoded = jwtDecode(token);

  const userId = decoded.id;

  function addTocart(id) {
    return axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          productId: id,
        },
        { headers }
      )
      .then((res) => res.data)
      .catch((err) => err);
  }

  function getLoggedcartItems() {
    return axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", { headers })
      .then((res) => res.data)
      .catch((err) => err);
  }

  function removeCartItem(productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers,
      })
      .then((res) => res.data)
      .catch((err) => err);
  }
  function updateCartProducts(productId, count) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { count: count },
        {
          headers,
        }
      )
      .then((res) => res.data)
      .catch((err) => err);
  }

  function clearcartProducts() {
    return axios
      .delete(
        `https://ecommerce.routemisr.com/api/v1/cart`,

        {
          headers,
        }
      )
      .then((res) => res.data)
      .catch((err) => err);
  }

  async function getCartItem() {
    let response = await getLoggedcartItems();
    setNOfCartItems(response.numOfCartItems);
    setCartId(response.cartId);
  }

  useEffect(() => {
    getCartItem();
  }, []);

  function cashOnDilvery(data) {
    return axios
      .post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`, data, {
        headers,
      })
      .then((res) => res.data)
      .catch((err) => err);
  }
  function onlinPayment(data) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`,
        data,
        {
          headers,
        }
      )
      .then((res) => res.data)
      .catch((err) => err);
  }

  return (
    <CartContext.Provider
      value={{
        addTocart,
        getLoggedcartItems,
        removeCartItem,
        updateCartProducts,
        clearcartProducts,
        onlinPayment,
        nOfCartItems,
        setCartId,
        setNOfCartItems,
        cashOnDilvery,
        userId,
        cartId

      }}
    >
      {children}
    </CartContext.Provider>
  );
}
