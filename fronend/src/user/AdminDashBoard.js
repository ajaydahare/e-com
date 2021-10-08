import React from "react";
import { Link } from "react-router-dom";
import { isAuthenticate } from "../auth/helper";
import Base from "../core/Base";

const AdminDashBoard = () => {
  const {
    user: { email, name, role },
  } = isAuthenticate();

  const adminLeftside = () => {
    return (
      <div className="card">
        <h4 className="card-header bg-dark text-white">Admin navigation</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link to="/admin/create/category" className="nav-link text-success">
              Create categories
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/categories" className="nav-link text-success">
              Manage categories
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/create/product" className="nav-link text-success">
              Create Product
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/products" className="nav-link text-success">
              Manage products
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/orders" className="nav-link text-success">
              Manage Orders
            </Link>
          </li>
        </ul>
      </div>
    );
  };
  const adminRightside = () => {
    return (
      <div className="card mb-4">
        <h4 className="card-header ">Admin Information</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <span className="badge badge-success mr-2">Name:</span>
            {name}
          </li>
          <li className="list-group-item">
            <span className="badge badge-success mr-2">Email:</span>
            {email}
          </li>
          <li className="list-group-item">
            <span className="badge badge-danger mr-2">Admin Area</span>
          </li>
        </ul>
      </div>
    );
  };
  return (
    <Base
      className="container bg-success p-4"
      title="Welcome to Admin Dashboard"
      description="Manage all of your products and orders here"
    >
      <div className="row">
        <div className="col-md-9">{adminRightside()}</div>
        <div className="col-md-3">{adminLeftside()}</div>
      </div>
    </Base>
  );
};

export default AdminDashBoard;
