import React, { useState, useEffect } from "react";
import { useGetRoomByIdQuery } from "../redux/services/roomsApi";
import Input from "../Input/Input";
import Error from "../Error/Error";
import Warning from "../Warning/Warning";
import {
  useDeleteRoomMutation,
  useUpdateRoomMutation,
} from "../redux/services/roomsApi";
import Space from "../Space/Space";

const ShowRoomById = () => {
  const [roomId, setRoomId] = useState("");
  const { data, error, isLoading } = useGetRoomByIdQuery(roomId);
  const [deleteRoom] = useDeleteRoomMutation();
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [updateRoom] = useUpdateRoomMutation();
  const [editingRoom, setEditingRoom] = useState({
    title: "",
    price: "",
    capacity: "",
    bed: "",
    bath: "",
    wifi: "",
    img: "",
    facilities: "",
    info: "",
  });
  useEffect(() => {
    selectedRoom &&
      setEditingRoom({
        ...editingRoom,
        title: selectedRoom.title,
        price: selectedRoom.price,
        capacity: selectedRoom.capacity,
        bed: selectedRoom.bed,
        bath: selectedRoom.bath,
        wifi: selectedRoom.wifi,
        img: selectedRoom.img,
        facilities: selectedRoom.facilities,
        info: selectedRoom.info,
      });
  }, [selectedRoom]);
  const handleUpdateFormSubmit = (event) => {
    event.preventDefault();
    updateRoom({
      id: selectedRoom.id,
      title: editingRoom.title,
      price: editingRoom.price,
      capacity: editingRoom.capacity,
      bed: editingRoom.bed,
      bath: editingRoom.bath,
      wifi: editingRoom.wifi,
      img: editingRoom.img,
      facilities: editingRoom.facilities,
      info: editingRoom.info,
    });
    event.target.reset();
  };

  const handleInputChange = (event) => {
    setEditingRoom({ ...editingRoom, [event.target.name]: event.target.value });
  };
  return (
    <div>
      لطفا کد اتاق مورد نظر را وارد کنید :
      <Input
        className="w-30"
        handleInputChange={(event) => setRoomId(event.target.value)}
      />
      {error && roomId ? (
        <Error>اتاقی با کد وارد شده وجود ندارد</Error>
      ) : isLoading ? (
        <Warning>در حال واکشی اطلاعات</Warning>
      ) : data && data.id ? (
        <div className="overflow-auto-x">
          <Space />
          <Space />
          <Space />

          <table className="showroombyid-table">
            <tbody>
              <tr key={data.id}>
                <td>{data.title}</td>
                <td>ظرفیت:{data.capacity}</td>
                <td>تعداد تخت :{data.bed}</td>
                <td> تعداد حمام :{data.bath}</td>
                <td> wifi :{data.wifi}</td>
                <td> قیمت هر شب :{data.price}ریال</td>
                <td>{data.img}</td>

                <td rowSpan={2}>
                  <button
                    className="btn"
                    style={{ background: "#FEA116" }}
                    onClick={() => setSelectedRoom(data)}
                  >
                    ویرایش
                  </button>
                </td>
                <td rowSpan={2}>
                  <button
                    className="btn delete-btn"
                    onClick={() => deleteRoom(data.id)}
                  >
                    حذف
                  </button>
                </td>
              </tr>
              <tr>
                <td colSpan={3}>امکانات : {data.facilities}</td>
                <td colSpan={4}>توضیحات : {data.info}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : null}
      <Space />
      <Space />
      <Space />
      {selectedRoom ? (
        <div>
          <form onSubmit={handleUpdateFormSubmit} className="editing-room-form">
            <table>
              <tr>
                <td colSpan={3}>
                  <Input
                    type="text"
                    value={editingRoom.title}
                    handleInputChange={handleInputChange}
                    name="title"
                  />
                </td>
              </tr>
              <Space />
              <tr>
                <td>
                  قیمت هر شب :
                  <Input
                    type="text"
                    value={editingRoom.price}
                    handleInputChange={handleInputChange}
                    name="price"
                  />
                </td>
                <td>
                  گنجایش :
                  <Input
                    type="number"
                    value={editingRoom.capacity}
                    handleInputChange={handleInputChange}
                    name="capacity"
                  />
                </td>
                <td>
                  تعداد تخت :{" "}
                  <Input
                    type="number"
                    value={editingRoom.bed}
                    handleInputChange={handleInputChange}
                    name="bed"
                  />
                </td>
                <td>
                  تعداد حمام :
                  <Input
                    type="number"
                    value={editingRoom.bath}
                    handleInputChange={handleInputChange}
                    name="bath"
                  />
                </td>
                <td>
                  wifi :{" "}
                  <Input
                    type="text"
                    value={editingRoom.wifi}
                    handleInputChange={handleInputChange}
                    name="wifi"
                  />
                </td>
                <td>
                  تصویر مربوطه :
                  <Input
                    type="text"
                    value={editingRoom.img}
                    handleInputChange={handleInputChange}
                    name="img"
                  />
                </td>
              </tr>
              <Space />
              <tr>
                <td colSpan={3}>
                  <label>امکانات : </label>
                  <br />
                  <textarea
                    value={editingRoom.facilities}
                    handleInputChange={handleInputChange}
                    name="facilities"
                    style={{ width: "100%" }}
                  ></textarea>
                </td>
                <td colSpan={3}>
                  <label>توضیحات : </label>
                  <textarea
                    value={editingRoom.info}
                    handleInputChange={handleInputChange}
                    name="info"
                    style={{ width: "100%" }}
                  ></textarea>
                </td>
              </tr>

              <Space />
              <tr>
                <td colSpan={6}>
                  <button className="btn">ویرایش</button>
                </td>
              </tr>
            </table>
          </form>
        </div>
      ) : null}
    </div>
  );
};

export default ShowRoomById;
