import { Route, Routes } from "react-router";
import "./App.css";
import { Home, MockmanApi, ProductDetails } from "./pages";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mockman" element={<MockmanApi />} />
        <Route path="/productdetails" element={<ProductDetails />} />
      </Routes>
    </div>
  );
}

export default App;
