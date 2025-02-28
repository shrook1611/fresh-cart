import React, { useContext, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Register from "./../Register/Register";
import axios from "axios";
import { tokenContext } from "../../Components/TokenContext/TokenContext";

export default function LogIn() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { setToken } = useContext(tokenContext);

  const initialValues = {
    email: "",
    password: "",
  };
  async function handleRegister(data) {
    setIsLoading(true);
    let x = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", data)
      .then((response) => {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setError(null);
        setIsLoading(false), navigate("/");
      })
      .catch((error) => {
        // setError(response.data.message);
        setIsLoading(false);
      });
  }

  const validationSchema = Yup.object({
    email: Yup.string().required().email(),
    password: Yup.string()
      .required()
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
        "password not match"
      ),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,

    onSubmit: handleRegister,
  });

  return (
    <div>
      <section className="bg-gray-50 w-1/2 mx-auto shadow p-3  py-8">
        <h1 className="font-bold my-2 text-3xl text-center text-green-600">LogIn </h1>

        {error && <div className="bg-red-400 p-3 rounded-lg">{error}</div>}
        <form className="w-1/2 mx-auto" onSubmit={formik.handleSubmit}>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter your Email"
              onChange={formik.handleChange}
              value={formik.values.email}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <small className="text-red-800">{formik.errors.email}</small>
            )}
          </div>
          <div className="mb-5">
            <label
              htmlFor="Password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your Password:
            </label>
            <input
              type="Password"
              id="Password"
              name="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter your Password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password && (
              <small className="text-red-800">{formik.errors.password}</small>
            )}
          </div>
          {isLoading ? (
            <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 disabled:bg-blue-300 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
              loadinig....
            </button>
          ) : (
            <button disabled={!formik.isValid} type="submit" className="btn">
              LogIn
            </button>
          )}
          <small>creat new account</small>{" "}
          <Link
            className=" text-green-600 font-bold capitalize"
            to={"/Register"}
          >
            register
          </Link>
          <div
            className="flex  gap-3 items-center
         "
          >
            <small>froget your password</small>
            <Link
              className=" text-green-600 font-bold  text-sm capitalize"
              to={"/forgetPassword"}
            >
              click here
            </Link>
          </div>
        </form>
      </section>
    </div>
  );
}
