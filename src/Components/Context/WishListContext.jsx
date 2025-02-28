import axios from "axios";
import { createContext, useEffect, useState } from "react";
import React from "react";

export const WishContext = createContext();
const headers = { token: localStorage.getItem("token") };

export default function WishListContextProvider({ children }) {
  const [nOfWishItems, setNOfWishItems] = useState(0);

  function addToWishList(id) {
    return axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          productId: id,
        },
        { headers }
      )
      .then((res) => {
        console.log(res.data);
        return res.data;
      })
      .catch((err) => err);
  }

  function getLoggedWishItems() {
    return axios
      .get("https://ecommerce.routemisr.com/api/v1/wishlist", { headers })
      .then((res) => {
        console.log(res.data);

        return res.data;
      })
      .catch((err) => err);
  }

  async function getWishItem() {
    let response = await getLoggedWishItems();
    // console.log(response);
    setNOfWishItems(response.count);
  }

  useEffect(() => {
    getWishItem();
  }, []);

  function removeWishItem(productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
        headers,
      })
      .then((res) => res.data)
      .catch((err) => err);
  }

  return (
    <WishContext.Provider
      value={{
        addToWishList,
        getLoggedWishItems,

        removeWishItem,
        getWishItem,
        nOfWishItems,
        setNOfWishItems,
      }}
    >
      {children}
    </WishContext.Provider>
  );
}
