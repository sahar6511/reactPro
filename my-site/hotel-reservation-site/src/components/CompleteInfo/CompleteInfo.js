import React, { useEffect, useState } from "react";
import PersonalInfo from "../PersonalInfo/PersonalInfo";
import TopMenu from "../TopMenu/TopMenu";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Space from "../Space/Space";
import "../../styles/main.scss";
import Title from "../Title/Title";
import PaymentType from "../PaymentType/PaymentType";
import Lows from "../Lows/Lows";
import LeftAngleIcon from "../Icons/LeftAngleIcon";
import { useAddNewReserveMutation } from "../redux/services/reservedInfoApi";
import validate from "../validate";
import { useNavigate } from "react-router-dom";
import {
  useGetCustomerByIdQuery,
  useAddNewCustomerMutation,
} from "../redux/services/cusomersApi";

const CompleteInfo = () => {
  const navigate = useNavigate();

  const [dataFromLocalStorage, setDataFromLocalStorage] = useState(
    JSON.parse(localStorage.getItem("reserveInfo"))
  );

  const [customerDataFromLocalStorage, setCustomerDataFromLocalStorage] =
    useState(JSON.parse(localStorage.getItem("customerInfo")));

  const [rdValue, setRdValue] = useState();
  const [showLow, setShowLow] = useState(false);
  const handleRdValueChange = (event) => {
    setRdValue(event.target.value);
    setTouched({ ...touched, [event.target.name]: true });
  };
  const handleShowLowClick = () => {
    setShowLow(!showLow);
  };

  const [addNewReserve, { isLoading: isAddingNewReserve }] =
    useAddNewReserveMutation();

  const [addNewCustomer, { isLoading: isAddingNewCustomer }] =
    useAddNewCustomerMutation();

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const handleInputBlur = (event) => {
    setTouched({ ...touched, [event.target.name]: true });
  };

  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    Name: "",
    Family: "",
    NationalCode: "",
    Mobile: "",
    Email: "",
  });
  const [touched, setTouched] = useState({
    Name: false,
    Family: false,
    NationalCode: false,
    Mobile: false,
    Email: false,
    RadioBox: false,
    Ls: false,
  });

  const { data, error, isLoading } = useGetCustomerByIdQuery(formData.Mobile);
  const navigateToSuccessPage = () => {
    navigate("/successpage");
  };

  useEffect(() => {
    setErrors(validate(formData, rdValue, dataFromLocalStorage));
    if (localStorage.getItem("reserveInfo")) {
      setDataFromLocalStorage(JSON.parse(localStorage.getItem("reserveInfo")));
    }
  }, [formData, touched, rdValue, dataFromLocalStorage]);

  const handleDeleteFromLocalStorage = (id) => {
    for (let index = 0; index < dataFromLocalStorage.length; index++) {
      if (dataFromLocalStorage[index].id === id) {
        dataFromLocalStorage.splice(index, 1);
      }
    }
    localStorage.setItem("reserveInfo", JSON.stringify(dataFromLocalStorage));
  };

  const handelAddNewReserve = async (event) => {
    event.preventDefault();

    if (data && data.customerMobile === formData.Mobile) {
      alert("شماره موبایل وارد شده قبلا در سیستم ثبت گردیده است ");
    } else {
      if (customerDataFromLocalStorage) {
        if (Object.keys(errors).length === 6) {
          setTouched({
            Name: true,
            Family: true,
            NationalCode: true,
            Mobile: true,
            Email: true,
            RadioBox: true,
            Ls: true,
          });
        } else {
          await addNewReserve({
            id: customerDataFromLocalStorage.customerMobile,
            customerName: customerDataFromLocalStorage.customerName,
            customerFamily: customerDataFromLocalStorage.customerFamily,
            customerNationalCode:
              customerDataFromLocalStorage.customerNationalCode,
            customerMobile: customerDataFromLocalStorage.customerMobile,
            customerEmail: customerDataFromLocalStorage.customerEmail,
            selectedRooms: dataFromLocalStorage,
            paymentType: rdValue,
          });
          navigateToSuccessPage();
        }
      } else if (!Object.keys(errors).length) {
        await addNewReserve({
          id: formData.Mobile,
          customerName: formData.Name,
          customerFamily: formData.Family,
          customerNationalCode: formData.NationalCode,
          customerMobile: formData.Mobile,
          customerEmail: formData.Email,
          selectedRooms: dataFromLocalStorage,
          paymentType: rdValue,
        });
        await addNewCustomer({
          id: formData.Mobile,
          customerName: formData.Name,
          customerFamily: formData.Family,
          customerNationalCode: formData.NationalCode,
          customerMobile: formData.Mobile,
          customerEmail: formData.Email,
        });
        navigateToSuccessPage();
      } else {
        setTouched({
          Name: true,
          Family: true,
          NationalCode: true,
          Mobile: true,
          Email: true,
          RadioBox: true,
          Ls: true,
        });
      }
    }
  };

  return (
    <div>
      <TopMenu />
      <Header />
      <Space />
      <Space />
      <Space />
      <Space />

      <div className="container-custom box-shadow p-15 complete-info">
        <Space />
        <Space />

        {!customerDataFromLocalStorage && (
          <PersonalInfo
            handleInputChange={handleInputChange}
            handleInputBlur={handleInputBlur}
            errors={errors}
            touched={touched}
            handelAddNewReserve={handelAddNewReserve}
          />
        )}
        <Space />
        <Space />
        <div className="complete-info__reserved--list">
          <Title title1="لیست اتاق های رزو شده" />
          <Space />
          {dataFromLocalStorage &&
            dataFromLocalStorage.map(
              (currentItem) =>
                currentItem.id && (
                  <div>
                    <div className="complete-info__cart--shopping">
                      <div className="pt-10">
                        <div
                          className="flex-container"
                          style={{ justifyContent: "space-between" }}
                        >
                          <h5>{currentItem.title}</h5>
                          <button
                            onClick={() =>
                              handleDeleteFromLocalStorage(currentItem.id)
                            }
                            className="delete-btn"
                          >
                            X
                          </button>
                        </div>
                        <p>
                          <span> قیمت هر شب : </span>
                          {currentItem.price}ریال
                        </p>
                        <p>
                          <span>تعداد بزرگسال :</span> {currentItem.adultCount}
                        </p>
                        <p>
                          <span> به مدت :</span> {currentItem.diffSatrtEnd}{" "}
                          <span>شب</span>
                        </p>
                        <p>
                          <span> قیمت کل :</span>{" "}
                          {currentItem.diffSatrtEnd *
                            currentItem.adultCount *
                            currentItem.price}{" "}
                          <span>ریال</span>
                        </p>
                      </div>
                    </div>
                    <Space />
                  </div>
                )
            )}
          {errors.Ls && touched.Ls && (
            <span style={{ color: "red", fontSize: ".7rem" }}>{errors.Ls}</span>
          )}
        </div>
        <Space />
        <Space />
        <div className="payment-type">
          <Title title1="نحوه پرداخت" />
          <Space />
          <PaymentType
            handleRdValueChange={handleRdValueChange}
            errors={errors}
            touched={touched}
          ></PaymentType>
        </div>
        <Space />
        <Space />
        <div className="lows" onClick={handleShowLowClick}>
          <div className="lows-title">
            <LeftAngleIcon />
            <Title
              title1="
          قوانین و شرایط رزرو "
            ></Title>
          </div>
          {showLow && <Lows />}
        </div>
        <Space />
        <div onClick={handelAddNewReserve} className="btn">
          ثبت نهایی
        </div>
      </div>
      <Space />
      <Footer />
    </div>
  );
};

export default CompleteInfo;
