import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

export default function AllOrders() {
  async function getAllOrders() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/orders/");
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ["allorders"],
    queryFn: getAllOrders,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching orders</div>;
  const allOrders = data?.data?.data;

  return (
    <div>
      <div className=" m-5">
        <h3 className="text-center text-green-600 font-bold text-2xl m-3">
          All Orders
        </h3>
      </div>

      <div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            {/* head */}
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="p-4"></th>
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
              </tr>
            </thead>

            {/* boody */}
            <tbody>
              {allOrders.length > 0 ? (
                allOrders.map((order) => {
                  return (
                    <tr
                      key={order.id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <td className="w-4 p-4"></td>
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
  );
}
