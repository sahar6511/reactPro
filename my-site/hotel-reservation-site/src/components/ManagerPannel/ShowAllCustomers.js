import React, { useState, useEffect } from "react";
import {
  useGetLimitCustomersQuery,
  useDeleteCustomerMutation,
  useUpdateCustomerMutation,
} from "../redux/services/cusomersApi";
import Space from "../Space/Space";
import "../../styles/main.scss";
import Input from "../Input/Input";

const ShowAllCustomers = () => {
  const [page, setPage] = useState(1);
  const { data: customers, error, isLoding } = useGetLimitCustomersQuery(page);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const [deleteCustomer] = useDeleteCustomerMutation();

  const [updateCustomer] = useUpdateCustomerMutation();
  const [editingCustomer, setEditingCustomer] = useState({
    id: "",
    name: "",
    family: "",
    nationalCode: "",
    mobile: "",
    email: "",
  });
  useEffect(() => {
    selectedCustomer &&
      setEditingCustomer({
        ...editingCustomer,
        name: selectedCustomer.customerName,
        family: selectedCustomer.customerFamily,
        nationalCode: selectedCustomer.customerNationalCode,
        mobile: selectedCustomer.customerMobile,
        email: selectedCustomer.customerEmail,
      });
  }, [selectedCustomer]);

  const handleUpdateFormSubmit = (event) => {
    event.preventDefault();
    console.log(editingCustomer);
    updateCustomer({
      id: selectedCustomer.id,
      customerName: editingCustomer.name,
      customerFamily: editingCustomer.family,
      customerNationalCode: editingCustomer.nationalCode,
      customerMobile: editingCustomer.mobile,
      customerEmail: editingCustomer.email,
    });
    event.target.reset();
  };

  const handleInputChange = (event) => {
    setEditingCustomer({
      ...editingCustomer,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <div className="showallcustomers">
      {error ? (
        <p className="error container-custom">احتمالا خطایی رخ داده است</p>
      ) : isLoding ? (
        <p className="container-custom warning">در حال واکشی اطلاعات</p>
      ) : customers ? (
        <div className="overflow-auto-x">
          <table className="showallcustomers-table">
            <thead>
              <tr>
                <th>کد شناسایی</th>
                <th>نام و نام خانوادگی</th>
                <th>کد ملی</th>
                <th>موبایل</th>
                <th>ایمیل</th>
                <th>ویرایش</th>
                <th>حذف</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id}>
                  <td> {customer.id}</td>
                  <td>
                    {customer.customerName} {customer.customerFamily}
                  </td>
                  <td> {customer.customerNationalCode}</td>
                  <td> {customer.customerMobile}</td>
                  <td> {customer.customerEmail}</td>
                  <td>
                    <button
                      className="btn"
                      style={{ background: "#FEA116" }}
                      onClick={() => setSelectedCustomer(customer)}
                    >
                      ویرایش
                    </button>
                  </td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => deleteCustomer(customer.id)}
                    >
                      حذف
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Space />
          <Space />
          <Space />

          <div className="showallcustomers-btns">
            <button
              className="btn"
              disabled={customers.length < 1}
              onClick={() => setPage((prev) => prev + 1)}
            >
              بعدی
            </button>
            <button
              className="btn"
              disabled={page <= 2}
              onClick={() => setPage((prev) => prev - 1)}
            >
              قبلی
            </button>
          </div>
        </div>
      ) : null}
      <Space />
      <Space />
      <Space />
      {selectedCustomer ? (
        <div>
          <form onSubmit={handleUpdateFormSubmit} className="editing-room-form">
            <table>
              <tr>
                <td colSpan={3}>
                  <Input
                    type="text"
                    value={editingCustomer.name}
                    handleInputChange={handleInputChange}
                    name="name"
                  />
                </td>
              </tr>
              <Space />
              <tr>
                <td>
                  <Input
                    type="text"
                    value={editingCustomer.family}
                    handleInputChange={handleInputChange}
                    name="family"
                  />
                </td>
                <td>
                  <Input
                    type="number"
                    value={editingCustomer.nationalCode}
                    handleInputChange={handleInputChange}
                    name="nationalCode"
                  />
                </td>
                <td>
                  <Input
                    type="number"
                    value={editingCustomer.mobile}
                    handleInputChange={handleInputChange}
                    name="mobile"
                  />
                </td>
                <td>
                  <Input
                    type="number"
                    value={editingCustomer.email}
                    handleInputChange={handleInputChange}
                    name="email"
                  />
                </td>
              </tr>

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

export default ShowAllCustomers;
