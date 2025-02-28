import React from "react";
import styles from "./MainLayOut.module.css";
import NavBar from "./../../Components/NavBar/NavBar";
import { Outlet } from "react-router-dom";
import Footer from "./../../Components/Footer/Footer";

export default function MainLayOut() {
  return (
    <div className="container">
      <NavBar />
      <Outlet />

      <Footer />
    </div>
  );
}
