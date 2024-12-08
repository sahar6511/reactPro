import React from "react";
import Success from "../Success/Success";
import Footer from "../Footer/Footer";
import TopMenu from "../TopMenu/TopMenu";
import Header from "../Header/Header";
import Space from "../Space/Space";

const SuccessPage = () => {
  return (
    <div>
      <TopMenu />
      <Header />
      <Space />
      <Space />
      <Space />
      <div className="box-shadow p-30">
        <Success>رزرو شما با موفقیت انجام گرفت</Success>
      </div>
      <Space />
      <Footer />
      {/* {
        localStorage.removeItem("reserveInfo")
      } */}
    </div>
  );
};

export default SuccessPage;
