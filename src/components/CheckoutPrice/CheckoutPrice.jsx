import { useContext } from "react";
import { DataContext } from "../../context/Data/DataContext";
import "./CheckoutPrice.css";
import { discountedAmount, totalCartPrice } from "../../pages/Cart/Cart";
import { Button } from "../Button/Button";
import { failToastMsg, successToastMsg } from "../ProductCard/ProductCard";
import { clearCart } from "../../utils/clearCart";
import { useNavigate } from "react-router";
import { orderId } from "../../utils/orderId";
import { AuthContext } from "../../context/Auth/AuthContext";
import dayjs from "dayjs";

const totalPriceWithoutDiscount = (dataState) =>
  dataState?.cart?.reduce((acc, { price, qty }) => acc + price * qty, 0);

const loadScript = (url) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = url;

    script.onload = () => {
      resolve(true);
    };

    script.onerror = () => {
      resolve(false);
    };

    document.body.appendChild(script);
  });
};

export const CheckoutPrice = ({ selectedAdd }) => {
  const { dataState, dispatchData } = useContext(DataContext);
  const { authState } = useContext(AuthContext);
  const navigate = useNavigate();
  const displayRazorpay = async () => {
    const response = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!response) {
      alert("Razorpay SDK failed to load, check you internet connection");
      return;
    }
    const options = {
      key: "rzp_test_Sc3qzAwjwIX2mb",
      amount: Number(totalCartPrice(dataState)) * 100,
      currency: "INR",
      name: "Zeeshan Akhter (BUZZ FASHION)",
      description: "Thank you for shopping with us",
      checkout: {
        method: {
          netbanking: 1,
          card: 1,
          upi: 1,
          wallet: 1,
        },
      },
      handler: function (response) {
        const orderHistoryObj = {
          user: authState?.userDetails?.email,
          id: orderId(),
          order: [...dataState?.cart],
          orderDate: new Date().toLocaleDateString(),
          orderTime:
            new Date().getHours() +
            ":" +
            new Date().getMinutes() +
            ":" +
            new Date().getSeconds(),
          amount: totalCartPrice(dataState),
          address: selectedAdd,
          paymentId: response.razorpay_payment_id,
        };

        dispatchData({
          type: "SET_ORDER_HISTORY",
          payload: orderHistoryObj,
        });
        successToastMsg(
          `Payment of Rs. ${totalCartPrice(dataState)} is Successfull`
        );
        clearCart(dispatchData, dataState);
        navigate("/success");
      },
      theme: {
        color: "#00A9FF",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <>
      <div className="checkout-container">
        <div className="card ">
          <h3 className="checkout__heading ">Order Details</h3>
          <hr />
          <p className="checkout__item">
            Item <span className="checkout__qty">Qty</span>
          </p>
          {dataState?.cart &&
            dataState?.cart?.map((item) => {
              const { id, title, qty } = item;
              return (
                <div key={id}>
                  <p className="checkout__item">
                    <b>{title}</b>{" "}
                    <span className="checkout__qty">
                      <b>{qty}</b>
                    </span>
                  </p>
                </div>
              );
            })}
          <hr />
          <h3 className=" checkout__heading">Price Details</h3>
          <hr />
          <p className="checkout__item">
            Price{" "}
            <span className="checkout__price">
              ₹ {totalPriceWithoutDiscount(dataState)}
            </span>
          </p>
          <p className="checkout__item">
            Discount
            <span
              className="checkout__discount"
              style={{ color: "rgb(22, 163, 74)", fontWeight: "bold" }}
            >
              -₹ {discountedAmount(dataState)}
            </span>
          </p>
          <p className="checkout__item">
            Delivery Charges <span className="checkout__discount">Free</span>
          </p>
          <p className="total__price">
            Total Amount{" "}
            <span className="checkout__price">
              ₹ {totalCartPrice(dataState)}
            </span>
          </p>
          <hr />
          <p className="total__price">Deliver To</p>
          <div className="checkout__item">
            <span>
              <b style={{ fontSize: "1.5rem" }}>{selectedAdd?.userName}</b>
            </span>
            <p>
              {selectedAdd?.houseNumber}, {selectedAdd?.area},{" "}
              {selectedAdd?.city}
            </p>
            <p>Pincode: {selectedAdd?.pincode}</p>
            <p>Ph No. {selectedAdd?.mobileNumber}</p>
          </div>

          <div
            className="place-order__btn"
            onClick={() => {
              if (totalCartPrice(dataState) === 0) {
                failToastMsg("please add some items to the cart");
                navigate("/products");
              } else {
                displayRazorpay();
              }
            }}
          >
            <Button title="Place Order" />
          </div>
        </div>
      </div>
    </>
  );
};
