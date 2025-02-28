import React from "react";
import { useFormik } from "formik";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function RestPassword() {
  const navigate = useNavigate();

  const user = {
    resetCode:''
  };

  async function handleCode(value) {
    console.log("Sending data:", value);
    try {
      const response = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",  value )
      console.log(response)
      if (response.data.status==='Success') {
        toast.success("Verification successful!");
        navigate("/newpassword");
      } else {
        toast.error("Invalid code or expired code");
      }
    } 
    catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    }
  }

  const formik = useFormik({
    initialValues:user,

    onSubmit: handleCode,
  });

  return (
    <div>
      <div className="p-5 m-5">
        <h2 className=" text-xl font-bold text-green-700 capitalize">
          please enter verfication code:
        </h2>

        <form className="w-1/2 mx-auto" onSubmit={formik.handleSubmit}>
          <div className="mb-5">
            <label
              htmlFor="resetCode"
              className="block mb-2  font-bold text-md capitalize text-gray-900 dark:text-white"
            >
              Your code:
            </label>
            <input
              type="text"
              id="resetCode"
              name="resetCode"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Verify your code"
              onChange={formik.handleChange}
              value={formik.values.resetCode}
              onBlur={formik.handleBlur}
            />
          </div>

          <button type="submit " className="btn">
            verfiy
          </button>
        </form>
      </div>
    </div>
  );
}
