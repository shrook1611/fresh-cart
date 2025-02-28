import React, { useContext } from "react";
import styles from "./Home.module.css";
import { CounterContext } from "../../Components/Context/CounterContext";
import LatestProducts from "../../Components/LatestProducts/LatestProducts";
import CategorySlider from "./../../Components/CategorySlider/CategorySlider";
import MainSlider from "./../../Components/MainSlider/MainSlider";
import GetDisscount from "../../Components/GetDisscount/GetDisscount";
import GetDeals from "../../Components/GetDeals/GetDeals";
import Search from "../../Components/Search/Search";
import LandingSlider from "../../Components/LandingSlider/LandingSlider";
export default function Home() {
  let { counter } = useContext(CounterContext);

  return (
    <div>

      
      <MainSlider></MainSlider>

      <CategorySlider></CategorySlider>

    
      <GetDisscount />
      {/* <Search /> */}
      <LandingSlider/>
      <LatestProducts />
      <GetDeals />
    </div>
  );
}
