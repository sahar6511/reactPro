import React, { useEffect, useState } from "react";
import "../../styles/main.scss";
import { Link, useLocation } from "react-router-dom";
import Divider from "../Divider/Divider";
import "../../styles/main.scss";
import ToggleIcon from "../Icons/ToggleIcon";
import Space from "../Space/Space";
import UserIcon from "../Icons/UserIcon";

const Header = () => {
  const location = useLocation();
  const [isToggle, setIsToggle] = useState(false);
  const [name, setName] = useState();
  const [family, setFamily] = useState();

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("customerInfo"))) {
      setName(JSON.parse(localStorage.getItem("customerInfo")).customerName);
      setFamily(
        JSON.parse(localStorage.getItem("customerInfo")).customerFamily
      );
    }
  }, []);

  return (
    <div className="header">
      <div className="container-custom">
        <div>
          <nav>
            <ul className="nav-links">
              <li className={location.pathname === "/" && "active"}>
                <Link to="/">صفحه اصلی</Link>
              </li>
              <li
                className={
                  location.pathname === "/onlinereservation" && "active"
                }
              >
                <Link to="/onlinereservation">رزرو آنلاین </Link>
              </li>
              <li className="nav-links__gallery">
                <a href="#">گالری </a>
                <ul className="nav-links__gallery--submenu fadeIn">
                  <li>
                    <Link to="/rooms">اتاق ها</Link>
                  </li>

                  <Divider></Divider>

                  <li>
                    <a>امکانات هتل</a>
                  </li>

                  <Divider></Divider>

                  <li>
                    {" "}
                    <Link to="/foods">غذاهای موجود</Link>
                  </li>
                </ul>
              </li>
              <li
                className={location.pathname === "/trakingreserve" && "active"}
              >
                <Link to="/trakingreserve"> پیگیری رزرو </Link>
              </li>
              <li
                className={location.pathname === "/managerpannel" && "active"}
              >
                <Link to="/managerpannel"> پنل مدیریت </Link>
              </li>
              {JSON.parse(localStorage.getItem("customerInfo")) ? (
                <li className="nav-links__user">
                  <a href="#">
                    <UserIcon
                      style={{ cursor: "pointer", fontSize: "1.5rem" }}
                    ></UserIcon>
                  </a>
                  <ul className="nav-links__user--submenu fadeIn">
                    <li>
                      {name} {family}
                    </li>

                    <Divider></Divider>

                    <li>
                      <a
                        href="/"
                        onClick={() => {
                          localStorage.removeItem("customerInfo");
                        }}
                      >
                        خروج
                      </a>
                    </li>
                  </ul>
                </li>
              ) : (
                <li
                  className={location.pathname === "/loginsignup" && "active"}
                >
                  <Link to="/loginsignup">ورود مشترکین </Link>
                </li>
              )}
            </ul>
          </nav>
          <button className="toggle-btn" onClick={() => setIsToggle(!isToggle)}>
            <ToggleIcon />
          </button>
          <Space />
          <nav className="nav-links-toggle">
            <ul className={isToggle ? "show-menu" : "hide-menu"}>
              <li className={location.pathname === "/" && "active"}>
                <Link to="/">صفحه اصلی</Link>
              </li>
              <li
                className={
                  location.pathname === "/onlinereservation" && "active"
                }
              >
                <Link to="/onlinereservation">رزرو آنلاین </Link>
              </li>
              <li className="nav-links__gallery">
                <a href="#">گالری </a>
                <ul className="nav-links__gallery--submenu">
                  <li>
                    <Link to="/rooms">اتاق ها</Link>
                  </li>

                  <Divider></Divider>

                  <li>
                    <a>امکانات هتل</a>
                  </li>

                  <Divider></Divider>

                  <li>
                    {" "}
                    <Link to="/foods">غذاهای موجود</Link>
                  </li>
                </ul>
              </li>
              <li
                className={location.pathname === "/trakingreserve" && "active"}
              >
                <Link to="/trakingreserve"> پیگیری رزرو </Link>
              </li>
              <li
                className={location.pathname === "/managerpannel" && "active"}
              >
                <Link to="/managerpannel"> پنل مدیریت </Link>
              </li>
              {JSON.parse(localStorage.getItem("customerInfo")) ? (
                <li className="nav-links__user">
                  <a href="#">
                    <UserIcon
                      style={{ cursor: "pointer", fontSize: "1.5rem" }}
                    ></UserIcon>
                  </a>
                </li>
              ) : (
                <li
                  className={location.pathname === "/loginsignup" && "active"}
                >
                  <Link to="/loginsignup">ورود مشترکین </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Header;
