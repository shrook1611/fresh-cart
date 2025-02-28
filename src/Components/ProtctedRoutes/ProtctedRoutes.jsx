import React from "react";
import styles from "./ProtctedRoutes.module.css";
export default function ProtctedRoutes({ children }) {
  if (localStorage.getItem("token")) {
    return children;
  } else {
    <nanigate to={"/LogIn"} />;
  }

  return <div>ProtctedRoutes</div>;
}
