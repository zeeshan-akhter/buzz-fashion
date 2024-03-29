import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter } from "react-router-dom";
import { DataContextProvider } from "./context/Data/DataContext";
import { FilterContextProvider } from "./context/Filter/FilterContext";
import { AuthContextProvider } from "./context/Auth/AuthContext";
import { ScrollToTop } from "./components/ScrollToTop/ScrollToTop";

// Call make Server
makeServer();

ReactDOM.render(
  // <React.StrictMode>
  <BrowserRouter>
    <ScrollToTop />
    <AuthContextProvider>
      <DataContextProvider>
        <FilterContextProvider>
          <App />
        </FilterContextProvider>
      </DataContextProvider>
    </AuthContextProvider>
  </BrowserRouter>,
  // </React.StrictMode>
  document.getElementById("root")
);
