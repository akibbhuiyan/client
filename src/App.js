import "./App.css";
import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router-dom";
import Home from "./component/Home/Home";
import "react-toastify/dist/ReactToastify.css";
import ProductPage from "./component/ProductPage/ProductPage";
import ProductDetailts from "./component/ProductDetailts/ProductDetailts";
import CartPage from "./component/CartPage/CartPage";
import CheckOutPage from "./component/CheckOutPage/CheckOutPage";
import Login from "./component/Login/Login";
import PrivateRoute from "./component/PrivateRoute/PrivateRoute";
import DashboardPage from "./component/Dashboard/DashboardPage.js";
import Invoice from "./component/Invoice/Invoice";
import ScrollToTop from "./component/Sharder/ScrollToTop/ScrollToTop";
import Footer from "./component/Sharder/Footer/Footer";
function App() {
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/products/:query" element={<ProductPage />} />
        <Route path="/productDetails/:id" element={<ProductDetailts />} />
        <Route path="/cart" element={<CartPage />} />
        <Route
          path="/checkout"
          element={
            <PrivateRoute>
              <CheckOutPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/order/:id"
          element={
            // <PrivateRoute>
            <Invoice />
            // </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
