import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import * as Yup from "yup";
export default function  ForgetPassword() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().required().email(),
  });

  async function handelForgetPassword(data) {
    setIsLoading(true);
    let x = await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, data)
      .then((response) => {
        if (response.data.statusMsg === "success") {
          setError(null);

          toast.success(response.data.message);

          setIsLoading(false), navigate("/resetPassword");
        }
      })
      .catch((err) => {
        console.log(err);
        setError("invalid email");
      });
  }

  const formik = useFormik({
    initialValues,
    validationSchema,

    onSubmit: handelForgetPassword,
  });

  return (
    <div className="p-5 m-5">
      <h2 className=" text-xl font-bold text-green-700 capitalize">
        please enter your email :
      </h2>

      <form className="w-1/2 mx-auto" onSubmit={formik.handleSubmit}>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2  font-bold text-md capitalize text-gray-900 dark:text-white"
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

        <button type="submit " className="btn">
          verfiy
        </button>
      </form>
    </div>
  );
}
