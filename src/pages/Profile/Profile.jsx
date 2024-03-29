import { useContext, useState, useEffect } from "react";
import "./Profile.css";
import { AuthContext } from "../../context/Auth/AuthContext";
import { Button } from "../../components/Button/Button";
import { DataContext } from "../../context/Data/DataContext";
import { AddressForm } from "../../utils/AddressForm/AddressForm";
import { EditAddresss } from "../../utils/EditAddresss";
import { successToastMsg } from "../../components/ProductCard/ProductCard";
import { OrderHistory } from "../../components/OrderHistory/OrderHistory";
import { UserProfile } from "../../components/UserProfile/UserProfile";

export const Profile = () => {
  const { authState, dispatchAuth } = useContext(AuthContext);

  const { dataState, dispatchData, clearItems } = useContext(DataContext);
  const [profileView, setProfileView] = useState({
    userDetails: true,
    userAddress: false,
    orderHistory: false,
  });
  const [showAdd, setShowAdd] = useState(true);
  const [addAddress, setAddAddress] = useState(false);

  useEffect(() => {
    dispatchData({
      type: "SET_SHOWSEARCH_FALSE",
      payload: false,
    });
  }, []);

  const btnStyle = {
    fontSize: "1.2rem",
    margin: "0px 10px 0px 0px",
    cursor: "pointer",
    padding: "4px 8px",
    border: "1px solid black",
    borderRadius: "4px",
    background: "white",
  };

  return (
    <>
      <div className="profile-container-layout">
        <div className="profile-container">
          <div className="profile-content">
            <h2
              style={{
                backgroundColor: profileView?.userDetails && "#00A9FF",
                color: profileView?.userDetails && "white",
              }}
              className="profile-content-header"
              onClick={() =>
                setProfileView(() => ({
                  userDetails: true,
                  userAddress: false,
                  orderHistory: false,
                }))
              }
            >
              Your Profile
            </h2>
            <h2
              style={{
                backgroundColor: profileView?.userAddress && "#00A9FF",
                color: profileView?.userAddress && "white",
              }}
              className="profile-content-header"
              onClick={() =>
                setProfileView(() => ({
                  userDetails: false,
                  userAddress: true,
                  orderHistory: false,
                }))
              }
            >
              Addresses
            </h2>
            <h2
              style={{
                backgroundColor: profileView?.orderHistory && "#00A9FF",
                color: profileView?.orderHistory && "white",
              }}
              className="profile-content-header"
              onClick={() =>
                setProfileView(() => ({
                  userDetails: false,
                  userAddress: false,
                  orderHistory: true,
                }))
              }
            >
              Order History
            </h2>
          </div>
          {profileView?.userDetails && <UserProfile />}

          {profileView?.userAddress && (
            <div>
              {" "}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "1rem",
                }}
              >
                <div onClick={() => setAddAddress((addAddress) => !addAddress)}>
                  <Button title={addAddress ? "Cancel" : "Add Address"} />
                </div>
                <div
                  onClick={() => {
                    setShowAdd((showAdd) => !showAdd);
                  }}
                >
                  <Button
                    title={showAdd ? "Hide Address" : "Show All Address(es)"}
                  />
                </div>
              </div>
              {addAddress && <AddressForm setAddAddress={setAddAddress} />}
              {showAdd && (
                <div className="address-container">
                  {dataState?.address?.length === 0 && (
                    <h3>No Address Added</h3>
                  )}
                  {dataState?.address?.length > 0 &&
                    dataState?.address.map(
                      ({
                        id,
                        userName,
                        houseNumber,
                        mobileNumber,
                        area,
                        city,
                        pincode,
                        isEdit,
                      }) => {
                        return (
                          <div key={id} className="address-section">
                            <div>
                              {isEdit && (
                                <EditAddresss
                                  editTodoId={id}
                                  showAdd={showAdd}
                                />
                              )}
                            </div>

                            <b
                              className="address-line-nomargin"
                              style={{ textTransform: "capitalize" }}
                            >
                              {userName}
                            </b>

                            <p className="address-line-nomargin">
                              {houseNumber}, {area}, {city}
                            </p>
                            <p>
                              Pincode:{" "}
                              <span className="address-line-nomargin">
                                {pincode}
                              </span>
                            </p>
                            <p>
                              Phone Number:{" "}
                              <span className="address-line-nomargin">
                                {mobileNumber}
                              </span>
                            </p>
                            <button
                              style={btnStyle}
                              onClick={() => {
                                dispatchData({
                                  type: "EDIT_TODO",
                                  payload: id,
                                });
                              }}
                            >
                              Edit
                            </button>
                            <button
                              style={btnStyle}
                              onClick={() => {
                                successToastMsg("Address Successfully Deleted");
                                dispatchData({
                                  type: "DELETE_USER_ADDRESS",
                                  payload: id,
                                });
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        );
                      }
                    )}
                </div>
              )}
            </div>
          )}
          {profileView?.orderHistory && <OrderHistory />}
        </div>
      </div>
    </>
  );
};

//pm/am
