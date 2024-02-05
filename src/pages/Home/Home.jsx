import { useContext, useEffect } from "react";
import { BestSellerSection } from "../../components/BestSellerSection/BestSellerSection";
import { GenderSection } from "../../components/GenderSection/GenderSection";
import { ImageCarousel } from "../../components/ImageCarousel/ImageCarousel";
import { NewArrivalSection } from "../../components/NewArrivalSection/NewArrivalSection";
import { DataContext } from "../../context/Data/DataContext";
import { FilterContext } from "../../context/Filter/FilterContext";
import { TopBrands } from "../../components/TopBrands/TopBrands";
import { Footer } from "../../components/Footer/Footer";

export const Home = () => {
  const { dispatchData } = useContext(DataContext);
  const { dispatchFilter } = useContext(FilterContext);
  useEffect(() => {
    dispatchData({
      type: "SET_SHOWSEARCH_FALSE",
      payload: false,
    });
    dispatchFilter({
      type: "CLEAR_ALL_FILTERS",
      payload: "",
    });
  }, []);
  return (
    <>
      <ImageCarousel />
      <GenderSection />
      <TopBrands />
      <NewArrivalSection />
      <BestSellerSection />
      <Footer />
    </>
  );
};
