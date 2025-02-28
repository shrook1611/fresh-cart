import React from "react";
import styles from "./Category.module.css";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

export default function Categories() {
  async function getCategories() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  const { data, error, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching categories</div>;

  const categories = data?.data?.data;

  return (
    <div className="row ">
      {categories?.map((category) => {
        {console.log(category)}
        return (
          <div className="xl:w-1/4 sm:w-full md:w-1/2 lg:w-1/3" key={category._id}>
          
          <Link to={`/categoryProducts/${category._id}`}>
          <div className="outter p-3 mt-5">
              <div className="inner cursor-pointer flex justify-center items-center flex-col ">
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-[200px] w-[200px] rounded-full hover:shadwo-lg hover:rotate-[360deg] hover:scale-[1.1]  transition-all duration-500"
                />
                <h5 className="font-bold text-green-600">{category.name}</h5>
              </div>
            </div>
          </Link>
          </div>
        );
      })}
    </div>
  );
}
