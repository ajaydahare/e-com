import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./core/Home";
import Signin from "./user/Signin";
import Signup from "./user/Signup";
import UserDashBoard from "./user/UserDashBoard";
import AdminDashBoard from "./user/AdminDashBoard";
import AdminRoutes from "./auth/helper/AdminRoutes";
import PrivateRoutes from "./auth/helper/PrivateRoutes";
import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";
import ManageProducts from "./admin/ManageProducts";
import ManageOrders from "./admin/Orders";
import updateThisProduct from "./admin/UpdateProduct";
import ManageCategory from "./admin/ManageCategories";
import UpdateCategories from "./admin/UpdateCategories";
import Cart from "./core/Cart";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home}></Route>
        <Route path="/signin" exact component={Signin}></Route>
        <Route path="/signup" exact component={Signup}></Route>
        <PrivateRoutes path="/user/dashboard" exact component={UserDashBoard} />
        <AdminRoutes path="/admin/dashboard" exact component={AdminDashBoard} />
        <AdminRoutes
          path="/admin/create/category"
          exact
          component={AddCategory}
        />
        <AdminRoutes
          path="/admin/create/product"
          exact
          component={AddProduct}
        />
        <AdminRoutes path="/admin/products" exact component={ManageProducts} />
        <AdminRoutes
          path="/admin/categories"
          exact
          component={ManageCategory}
        />
        <AdminRoutes path="/admin/orders" exact component={ManageOrders} />
        <AdminRoutes
          path="/admin/product/update/:productId"
          exact
          component={updateThisProduct}
        />
        <AdminRoutes
          path="/admin/category/update/:categoryId"
          exact
          component={UpdateCategories}
        />
        <Route path="/cart" exact component={Cart} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
