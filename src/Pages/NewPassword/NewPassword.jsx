import React, { useContext, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

export default function NewPassword() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    newPassword: "",
  };
  async function handleNewPassword(data) {
    console.log(data);
    setIsLoading(true);
    let x = await axios
      .put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", data)
      .then((response) => {
        console.log(response);
        setError(null);
        setIsLoading(false), navigate("/login");
      })
      .catch((error) => {
       
        setIsLoading(false);
      });
  }

  const validationSchema = Yup.object({
    email: Yup.string().required().email(),
    newPassword: Yup.string()
      .required()
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
        "password not match"
      ),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,

    onSubmit: handleNewPassword,
  });

  return (
    <div>
      <section className="bg-gray-50 w-1/2 mx-auto shadow p-3  py-8">
        <h1 className="font-bold my-2 text-xl  capitalize text-green-600">
          rest new password :
        </h1>

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
              htmlFor="newPassword"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              New Password:
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter your newPassword"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.newPassword}
            />
            {formik.touched.newPassword && formik.errors.newPassword && (
              <small className="text-red-800">
                {formik.errors.newPassword}
              </small>
            )}
          </div>
          {isLoading ? (
            <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 disabled:bg-blue-300 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
              loadinig....
            </button>
          ) : (
            <button disabled={!formik.isValid} type="submit" className="btn">
              Rest
            </button>
          )}
        </form>
      </section>
    </div>
  );
}
