import React, { useContext, useEffect, useState } from "react";
import { WishContext } from "../../Components/Context/WishListContext";
import { MdFavorite } from "react-icons/md";
import { FaCartShopping } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { RiDeleteBinLine } from "react-icons/ri";
import toast from "react-hot-toast";
export default function Wishlist() {
  const [wishlistData, setWishlistData] = useState([]);

  const { getLoggedWishItems,removeWishItem ,setNOfWishItems,  nOfWishItems,} = useContext(WishContext);

  async function getWishData() {
    const res = await getLoggedWishItems();
    setWishlistData(res);
    setNOfWishItems(res.count)
  }

  async function removeItem(id){
    
    const res = await removeWishItem(id)
    getWishData()
    
    if (res.status == "success") {
 
        toast.success(res.message, { style: { fontWeight: "bold" ,
          color:"red"
        } });
      } else {
        toast.error("somthing went wrong");
      }
}













  useEffect(() => {
    getWishData();
  }, []);













  return (
    <div>
      <div className="titleHolder flex justify-between items-center">
        <h2 className="font-extrabold text-2xl">
          WishList <MdFavorite className="inline text-red-600 " />
        </h2>
        <p className="text-green-600 font-extrabold">
          {" "}
          <span className="font-bold text-lg">count: </span>{" "}
          {wishlistData.count}
        </p>
      </div>

      {/* table */}

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
              price
              </th>
              <th scope="col" className="px-6 py-3">
                remove
              </th>
             
            </tr>
          </thead>

          {/* table body */}
          <tbody>
            {wishlistData.data?.length > 0 ? (
              wishlistData.data.map((product) => {
                return (
                  <tr
                    key={product.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="p-4">
                     <Link to={`/productDetails ${product.id}`}> <img
                        src={product.imageCover}
                        className="w-16 md:w-32 max-w-full max-h-full"
                        alt="Apple Watch"
                      /></Link>
                    </td>
                    <td className="px-6 py-4  font-semibold text-gray-900 dark:text-white">
                      {product.title}
                    </td>

                    <td className="px-6 py-4 font-bold text-green-900 dark:text-white">
                      {product.price}
                    </td>
                    <td className="px-6 py-4">
                      <button
                       onClick={()=>{removeItem(product.id)}}
                        className="font-medium text-red-600 dark:text-red-500 hover:underline"
                      >
                      <RiDeleteBinLine  className=" text-2xl text-red-700"/>
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <div className=" flex items-center justify-center">
                <h3 className="text-2xl font-bold text-black capitalize">
                  no data found please continue shopping{" "}
                  <Link to={"/"}>
                    <FaCartShopping className=" inline text-green-600 text-2xl" />
                  </Link>
                </h3>
              </div>
            )}

            {/* {console.log(wishlistData.count)} */}
          </tbody>
        </table>
      </div>
    </div>
  );
}
