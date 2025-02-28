import React, { useState } from "react";
import styles from "./Register.module.css";
import LogIn from "./../LogIn/LogIn";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import  axios  from 'axios';

export default function Register() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false)
const navigate=useNavigate()
  const initialValues = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
  };
  async function handleRegister(data) {
    setIsLoading(true)
    let x = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", data)
      .then((response) => {
        setError(null);
        setIsLoading(false)
        navigate('/login')
      
      })
      .catch((error) => {
        console.log(error);
    
        //  setError(response.data.message);
        setIsLoading(false)
      });
      console.log(data)
  }
  // function validatData(data) {
  //   let errors = {};
  //   const nameRegex = /^[A-Z a-z 0-9_-]{3,15}$/;
  //   const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
  //   const passwordRegex =
  //     /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
  //   const phoneRegex = /^01[0125][0-9]{8}$/;

  //   if (data.name == "") {
  //     errors.name = "invaild id name";
  //   } else if (!nameRegex.test(data.name)) {
  //     errors.name = "invaild name";
  //   }

  //   if (data.email == "") {
  //     errors.email = "invaild  email";
  //   } else if (!emailRegex.test(data.email)) {
  //     errors.email = "invaild email";
  //     console.log(errors);
  //   }

  //   if (data.password == "") {
  //     errors.password = "invaild  password";
  //   } else if (!passwordRegex.test(data.password)) {
  //     errors.password = "invaild password";
  //     console.log(errors);
  //   }

  //   if (data.password == "") {
  //     errors.password = "invaild  password";
  //   } else if (data.rePassword !== data.password) {
  //     errors.password = "invaild password";
  //     console.log(errors);
  //   }

  //   if (data.phone == "") {
  //     errors.phone = "invaild  phone";
  //   } else if (!phoneRegex.test(data.phone)) {
  //     errors.phone = "invaild phone";
  //     console.log(errors);
  //   }

  //   console.log(errors);

  //   return errors;
  // }
  const validationSchema = Yup.object({
    name: Yup.string().required().max(20).min(2),
    email: Yup.string().required().email(),
    password: Yup.string()
      .required()
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
        "password not match"
      ),
    phone: Yup.string()
      .required()
      .matches(/^01[0125][0-9]{8}$/, "phone not match"),

    rePassword: Yup.string()
      .required()
      .oneOf([Yup.ref("password")], "password doesnot match"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    // validate: validatData,
    onSubmit: handleRegister,
  });

  return (
    <div>
      <section className="bg-gray-50 w-1/2 mx-auto shadow p-3 ">
        <h1 className="font-bold my-2 text-2xl text-center text-green-600">Register Now</h1>
        
        {error&&<div className="bg-red-400 p-3 rounded-lg">{error}</div>

        }
        <form className="w-1/2 mx-auto" onSubmit={formik.handleSubmit}>
          <div className="mb-5">
            <label
              htmlFor="Name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your Name:
            </label>
            <input
              type="Name"
              id="Name"
              name="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter your Name"
              onChange={formik.handleChange}
              value={formik.values.name}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name && (
              <small className="text-red-800">{formik.errors.name}</small>
            )}
          </div>
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
          <div className="mb-5">
            <label
              htmlFor="Repassword"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your Repassword :
            </label>
            <input
              type="Password"
              id="repassword"
              name="rePassword"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter your repassword"
              onChange={formik.handleChange}
              value={formik.values.rePassword}
              onBlur={formik.handleBlur}
            />
            {formik.touched.rePassword && formik.errors.rePassword && (
              <small className="text-red-800">{formik.errors.rePassword}</small>
            )}
          </div>
          <div className="mb-5">
            <label
              htmlFor="phone"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your phone :
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter your phone"
              onChange={formik.handleChange}
              value={formik.values.phone}
              onBlur={formik.handleBlur}
            />
            {formik.touched.phone && formik.errors.phone && (
              <small className="text-red-800">{formik.errors.phone}</small>
            )}
          </div>
        {isLoading?  <button
          
           
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 disabled:bg-blue-300 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
           loadinig....
          </button>:



          <button
          disabled={formik.isValid == false}
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 disabled:bg-blue-300 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Register
        </button>}
          <small>Alerady have account</small> <Link  className="text-green-600 font-bold"         to={"/LogIn"}>Login</Link>
        </form>
      </section>
    </div>
  );
}
