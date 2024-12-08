import React, { useState } from "react";
import Space from "../Space/Space";
import Input from "../Input/Input";
import { useAddNewRoomMutation } from "../redux/services/roomsApi";
import { v4 as uuid } from "uuid";
import "../../styles/main.scss";

const AddNewRoom = () => {
  const [formData, setFormData] = useState({
    id: "",
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
  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    console.log(event.target.value);
  };
  const [addNewRoom, { isLoading: isAddingNewCustomer }] =
    useAddNewRoomMutation();

  const handleAddNewRoom = async (event) => {
    event.preventDefault();
    await addNewRoom({
      id: uuid().substring(0, 3),
      title: formData.title,
      price: formData.price,
      capacity: formData.capacity,
      bed: formData.bed,
      bath: formData.bath,
      wifi: formData.wifi,
      img: formData.img,
      facilities: formData.facilities,
      info: formData.info,
    });
    event.target.reset();
  };

  return (
    <form onSubmit={handleAddNewRoom} className="adding-room-form">
      <div className="overflow-auto-x">
        <table>
          <tr>
            <td colSpan={3}>
              <Input
                type="text"
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
                handleInputChange={handleInputChange}
                name="price"
              />
            </td>
            <td>
              گنجایش :
              <Input
                type="number"
                handleInputChange={handleInputChange}
                name="capacity"
              />
            </td>
            <td>
              تعداد تخت :{" "}
              <Input
                type="number"
                handleInputChange={handleInputChange}
                name="bed"
              />
            </td>
            <td>
              تعداد حمام :
              <Input
                type="number"
                handleInputChange={handleInputChange}
                name="bath"
              />
            </td>
            <td>
              wifi :{" "}
              <Input
                type="text"
                handleInputChange={handleInputChange}
                name="wifi"
              />
            </td>
            <td>
              تصویر مربوطه :
              <Input
                type="file"
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
                handleInputChange={handleInputChange}
                name="facilities"
                style={{ width: "100%" }}
              ></textarea>
            </td>
            <td colSpan={3}>
              <label>توضیحات : </label>
              <textarea
                handleInputChange={handleInputChange}
                name="info"
                style={{ width: "100%" }}
              ></textarea>
            </td>
          </tr>

          <Space />
          <tr>
            <td colSpan={6}>
              <button className="btn">اضافه کردن</button>
            </td>
          </tr>
        </table>
      </div>
    </form>
  );
};

export default AddNewRoom;
