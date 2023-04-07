import React from "react";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Categories from "./pages/categories/Categories";
import Cart from "./pages/cart/Cart";
import Details from "./pages/details/Details";
import { Provider } from "react-redux";
import store from "./store";
import AuthComponent from "./admin/components/auth/AuthComponent";
import Products from "./pages/products/Products";
import Dashboard from "./admin/pages/dashboard/Dashboard";
import Orders from "./admin/pages/orders/Order";
import AdminLogin from "./admin/pages/login/AdminLogin";
import UserList from "./admin/pages/userList/UserList";
import List from "./admin/pages/list/List";
import Single from "./admin/pages/single/Single";
import New from "./admin/pages/new/New";
import "./admin/style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./admin/context/darkModeContext";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function Router() {
  const { darkMode } = useContext(DarkModeContext);
  return (
    <>
      <div className={darkMode ? "app dark" : "app"}>
        <BrowserRouter>
          <Provider store={store}>
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/Categories/:category/" element={<Categories />} />
              <Route path="Products/:category" element={<Products />} />
              <Route path="product/:id" element={<Details />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/Register" element={<Register />} />
              <Route path="/Cart" element={<Cart />} />
              <Route path="/Admin/">
                <Route element={<AuthComponent />}>
                  <Route index element={<Dashboard />} />
                  <Route path="users">
                    <Route index element={<UserList />} />
                  </Route>
                  <Route path="products">
                    <Route index element={<List />} />
                    <Route path="product/:Id" element={<Single />} />
                    <Route path="new" element={<New />} />
                  </Route>
                  <Route path="Orders" exact element={<Orders />} />
                </Route>
                <Route path="login" exact element={<AdminLogin />} />
              </Route>
            </Routes>
          </Provider>
        </BrowserRouter>
      </div>
    </>
  );
}

export default Router;
