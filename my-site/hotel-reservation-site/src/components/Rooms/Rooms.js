import React, { useState, useEffect } from "react";
import TopMenu from "../TopMenu/TopMenu";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Space from "../../components/Space/Space";
import SectionTitle from "../SectionTitle/SectionTitle";
import { useGetRoomsQuery } from "../redux/services/roomsApi";
import "../../styles/main.scss";
import RoomBox from "../RoomBox/RoomBox";
import ScrollButton from "../ScrollButton/ScrollButton ";
import SearchPannel from "../SearchPanel/SearchPanel";

const Rooms = () => {
  const { data: rooms, error, isLoding } = useGetRoomsQuery();

  const [searchedItem, setSarchedItem] = useState();
  const [filteredRooms, setFilteredRooms] = useState(rooms);

  const handleInputChange = (event) => {
    setSarchedItem(event.target.value);
  };

  useEffect(() => {
    if (searchedItem === undefined) {
      setFilteredRooms(rooms);
    } else {
      setFilteredRooms(
        rooms.filter((room) =>
          room.title.toLowerCase().includes(searchedItem.toLowerCase())
        )
      );
    }
  }, [searchedItem][rooms]);

  return (
    <div className="room">
      <TopMenu />
      <Header />
      <Space />
      <Space />
      <Space />
      <Space />

      <SearchPannel handleInputChange={handleInputChange}></SearchPannel>
      <Space />
      <SectionTitle>اتاق های هتل</SectionTitle>
      <div className="container-custom">
        {error ? (
          <p className="error container-custom">احتمالا خطایی رخ داده است</p>
        ) : isLoding ? (
          <p className="container-custom warning">در حال واکشی اطلاعات</p>
        ) : rooms && filteredRooms ? (
          <div className="rooms-container">
            {filteredRooms.map((room) => (
              <RoomBox
                key={room.id}
                id={room.id}
                title={room.title}
                src={room.img}
                bed={room.bed}
                bath={room.bath}
                wifi={room.wifi}
                price={room.price}
                info={room.info}
                facilities={room.facilities}
                imgurls={room.imgurls}
              ></RoomBox>
            ))}
          </div>
        ) : null}
      </div>
      <Space />
      <Footer />
      <ScrollButton />
    </div>
  );
};

export default Rooms;
