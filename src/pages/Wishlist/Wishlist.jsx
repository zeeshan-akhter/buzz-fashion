import { useContext, useEffect } from "react";
import { DataContext } from "../../context/Data/DataContext";
import "./Wishlist.css";
import { ProductCard } from "../../components/ProductCard/ProductCard";

export const Wishlist = () => {
  const { dataState, dispatchData } = useContext(DataContext);
  useEffect(() => {
    dispatchData({
      type: "SET_SHOWSEARCH_FALSE",
      payload: false,
    });
  }, []);

  if (dataState?.wishlist?.length === 0) {
    return (
      <div style={{ width: "100%", height: "100vh" }}>
        <h2 className="wishlist-header">My Wishlist</h2>
        <img
          src="https://cdni.iconscout.com/illustration/premium/thumb/no-wishlist-8316267-6632287.png?f=avif"
          height="60%"
          alt="wishlist_img"
          style={{
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        />
        <h3 style={{ textAlign: "center" }}>Your Wishlist is Empty</h3>
      </div>
    );
  } else {
    return (
      <div>
        <h2 className="wishlist-header">My Wishlist</h2>
        <div className="wishlist-container">
          {dataState?.wishlist && <ProductCard data={dataState?.wishlist} />}
        </div>
      </div>
    );
  }
};
