import ProductList from "./pages/ProductList";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import axios from "axios";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("hexToken="))
      ?.split("=")[1];
    axios.defaults.headers.common.Authorization = token;
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/productList" element={<ProductList />}></Route>
      </Routes>
    </>
  );
}

export default App;
