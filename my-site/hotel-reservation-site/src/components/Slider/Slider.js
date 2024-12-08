import React from "react";
import TopMenu from "../TopMenu/TopMenu";
import Header from "../Header/Header";
import Divider from "../Divider/Divider";
import "../../styles/main.scss";

const Slider = () => {
  return (
    <div className="slider">
      <TopMenu />
      <Divider />
      <Header />
    </div>
  );
};

export default Slider;
