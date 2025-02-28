import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext } from "react";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";
import { CartContext } from './../../Components/Context/CartContext';
export default function UserOrder() {
  const token = localStorage.getItem("token");
const {cartId}=useContext(CartContext)
  const decoded = jwtDecode(token);
console.log(cartId)
  const userId = decoded.id;

  if (!userId) {
    return <div>User ID not found in the token.</div>;
  }
  async function getUserOrders() {
    return await axios.get(
      `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`
    );
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ["userOrders", userId],
    queryFn: getUserOrders,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching orders</div>;
  const userOrders = data?.data;

  if (!userOrders || userOrders.length === 0) {
    return <div>No orders found.</div>;
  }

  return (
    <div>
      <div>
        <div className=" m-5">
          <h3 className="text-center text-green-600 font-bold text-2xl m-3">
            My Orders
          </h3>
        </div>

        <div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              {/* head */}
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                 
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    TotalPrice
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Delvery
                  </th>
                  <th scope="col" className="px-6 py-3">
                    paymentMethod
                  </th>
                  <th scope="col" className="px-6 py-3">
                    order date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    view order
                  </th>
                </tr>
              </thead>

              {/* boody */}
              <tbody>
                {userOrders.length > 0 ? (
                  userOrders.map((order) => {
                    return (
                      <tr key={order.id}   className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th
                          scope="row"
                          className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          <div className="ps-3">
                            <div className="text-base font-semibold">
                              {order.user.name}
                            </div>
                            <div className="font-normal text-gray-500">
                              {order.user.email}
                            </div>
                          </div>
                        </th>
                        <td className="px-6 py-4">{order.totalOrderPrice}</td>
                        {order.isDelivered ? (
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2" />
                              {order.isDelivered} Delverd
                            </div>
                          </td>
                        ) : (
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <div className="h-2.5 w-2.5 rounded-full bg-red-500 me-2" />
                              {order.isDelivered}Not yet
                            </div>
                          </td>
                        )}
                        {order.paymentMethodType == "cash" ? (
                          <td className="px-6 py-4">
                            <a
                              href="#"
                              className="font-bold text-blue-600 dark:text-blue-500 hover:underline"
                            >
                              {order.paymentMethodType}
                            </a>
                          </td>
                        ) : (
                          <td className="px-6 py-4">
                            <a
                              href="#"
                              className="font-bold text-green-600 dark:text-blue-500 hover:underline"
                            >
                              {order.paymentMethodType}
                            </a>
                          </td>
                        )}

                        <td className="px-6 py-4">
                          <a
                            href="#"
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                          >
                            {order.updatedAt.slice(0, 10)}
                          </a>
                        </td>
{console.log(order)}
                        <td className="px-6 py-4">
                          <Link to={`/ViewCart/${cartId}`}>
                            <button className="font-medium btn">view</button>
                          </Link>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <div>
                    <h4>No orders found</h4>
                  </div>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
