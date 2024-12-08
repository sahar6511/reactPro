import React, { useState } from "react";
import "../../styles/main.scss";
import WifiIcon from "../Icons/WifiIcon";
import BathIcon from "../Icons/BathIcon";
import BedIcon from "../Icons/BedIcon";
import LikeUnLikeIcon from "../Icons/LikeUnLikeIcon";
import { Modal } from "react-responsive-modal";
import Title from "../Title/Title";
import Space from "../Space/Space";
import Slider from "react-slick";
const RoomBox = (props) => {
  const [open, setOpen] = useState(false);

  const { id, title, src, bed, bath, wifi, price, info, facilities, imgurls } =
    props;
  const hendelLikeUnLikeClick = (event) => {
    if (event.target.classList.contains("like")) {
      event.target.classList.remove("like");
    } else {
      event.target.classList.add("like");
    }
  };

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="room-box fadeInUp">
      <Modal
        open={open}
        center={true}
        classNames={{
          overlayAnimationIn: "customEnterOverlayAnimation",
          overlayAnimationOut: "customLeaveOverlayAnimation",
          modalAnimationIn: "customEnterModalAnimation",
          modalAnimationOut: "customLeaveModalAnimation",
          modal: "customModal",
          overlay: "customOverlay",
        }}
        animationDuration={800}
      >
        <div className="flex-container" style={{ justifyContent: "flex-end" }}>
          <button className="btn delete-btn" onClick={() => setOpen(false)}>
            X
          </button>
        </div>

        <h4>{title}</h4>
        <Space />
        <Title title1="هتل بزرگ آریا"></Title>
        <Space />

        <div className="flex-container">
          <div style={{ margin: "0", padding: "0", width: "30%" }}>
            <Slider {...settings}>
              <div>
                <img src={imgurls[0]} alt={imgurls[0]} />
              </div>
              <div>
                <img src={imgurls[1]} alt={imgurls[1]} />
              </div>
              <div>
                <img src={imgurls[2]} alt={imgurls[2]} />
              </div>
              <div>
                <img src={imgurls[3]} alt={imgurls[3]} />
              </div>
            </Slider>
          </div>

          <div>
            <p>{info}</p>
            <Space />
            <h4>مشخصات کلی اتاق :</h4>
            <Space />
            <ul>
              <li></li>
              <li className="flex-container">
                <WifiIcon className="orang-color" /> :<span>{wifi}</span>
              </li>
              <li className="flex-container">
                <BedIcon className="orang-color" /> :<span>{bed}</span>
              </li>
              <li className="flex-container">
                <BathIcon className="orang-color" /> :<span>{bath}</span>
              </li>
              <LikeUnLikeIcon
                hendelLikeUnLikeClick={hendelLikeUnLikeClick}
              ></LikeUnLikeIcon>
            </ul>
            <Space />
            <p>امکانات : {facilities}</p>
          </div>
        </div>
      </Modal>

      <div className="room-box--img">
        <img src={src} alt={src} />
        <div>{price}تومان </div>
      </div>
      <div className="room-box--title">
        <h4>{title}</h4>
      </div>

      <ul className="room-box--icon">
        <li>
          <LikeUnLikeIcon
            hendelLikeUnLikeClick={hendelLikeUnLikeClick}
          ></LikeUnLikeIcon>
        </li>
        <li>
          <span>{wifi}</span>
          <WifiIcon />
        </li>
        <li>
          <span>{bed}</span>
          <BedIcon />
        </li>
        <li>
          <span>{bath}</span>
          <BathIcon />
        </li>
      </ul>

      <div className="room-box--info">
        <p>{info}</p>
      </div>
      <div className="p-30">
        <button onClick={() => setOpen(true)} className="btn">
          جزییات بیشتر
        </button>
      </div>
    </div>
  );
};

export default RoomBox;
