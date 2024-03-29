import { useContext, useState } from "react";
import { DataContext } from "../context/Data/DataContext";
import { failToastMsg } from "../components/ProductCard/ProductCard";

export const EditAddresss = ({ editTodoId }) => {
  const { dataState, dispatchData } = useContext(DataContext);
  const [editAddress, setEditAddress] = useState({
    id: editTodoId,
    userName: dataState?.address?.find(({ id }) => id === editTodoId).userName,
    houseNumber: dataState?.address?.find(({ id }) => id === editTodoId)
      .houseNumber,
    mobileNumber: dataState?.address?.find(({ id }) => id === editTodoId)
      .mobileNumber,
    area: dataState?.address?.find(({ id }) => id === editTodoId).area,
    city: dataState?.address?.find(({ id }) => id === editTodoId).city,
    pincode: dataState?.address?.find(({ id }) => id === editTodoId).pincode,
  });
  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setEditAddress((editAddress) => ({ ...editAddress, [name]: value }));
  };
  return (
    <>
      <form className="address-form-container">
        <label className="address-form-container-label">
          Name
          <input
            placeholder="Faisal Akhter"
            className="address-form-container-input"
            type="text"
            required
            name="userName"
            value={editAddress.userName}
            onChange={handleInputChange}
          />
        </label>
        <label className="address-form-container-label">
          House Number
          <input
            className="address-form-container-input"
            type="text"
            required
            name="houseNumber"
            value={editAddress.houseNumber}
            onChange={handleInputChange}
          />
        </label>
        <label className="address-form-container-label">
          Mobile Number
          <input
            className="address-form-container-input"
            type="number"
            required
            value={editAddress.mobileNumber}
            name="mobileNumber"
            onChange={handleInputChange}
          />
        </label>
        <label className="address-form-container-label">
          Area
          <input
            className="address-form-container-input"
            type="text"
            required
            name="area"
            value={editAddress.area}
            onChange={handleInputChange}
          />
        </label>
        <label className="address-form-container-label">
          City
          <input
            className="address-form-container-input"
            type="text"
            required
            name="city"
            value={editAddress.city}
            onChange={handleInputChange}
          />
        </label>
        <label className="address-form-container-label">
          Pincode
          <input
            className="address-form-container-input"
            type="number"
            required
            name="pincode"
            value={editAddress.pincode}
            onChange={handleInputChange}
          />
        </label>
        <button
          className="address-form-container-btn "
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            const phoneRegex = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
            const pinRegex = /^\d{6}$/;
            if (
              phoneRegex.test(editAddress?.mobileNumber) &&
              pinRegex.test(editAddress?.pincode)
            ) {
              dispatchData({
                type: "SAVE_EDITED_ADDRESS",
                payload: [editAddress, editTodoId],
              });
            } else if (!phoneRegex.test(editAddress?.mobileNumber)) {
              failToastMsg("please enter valid Mobile Number");
            } else if (!pinRegex.test(editAddress?.pincode)) {
              failToastMsg("please enter valid Pincode");
            }
          }}
        >
          Edit Address
        </button>
        <button
          className="address-form-container-btn "
          type="submit"
          onClick={() => {
            dispatchData({
              type: "CANCEL_EDITED_ADDRESS",
              payload: editTodoId,
            });
          }}
        >
          Cancel
        </button>
      </form>
    </>
  );
};
