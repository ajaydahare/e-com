import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { isAuthenticate } from "../auth/helper";
import Base from "../core/Base";
import { getCategory, UpdateCategory } from "./helper/adminapicall";

function UpdateCategories({ match }) {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [getRedirect, setGetRedirect] = useState(false);

  const { user, token } = isAuthenticate();

  const preload = (categoryId) => {
    getCategory(categoryId)
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setName(data.name);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    preload(match.params.categoryId);
  }, []);

  const goBack = () => {
    return (
      <div className="m-2">
        <Link to="/admin/dashboard">
          <button className="btn btn-sm btn-info">Back</button>
        </Link>
      </div>
    );
  };
  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleClick = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);
    UpdateCategory(match.params.categoryId, user._id, token, { name })
      .then((data) => {
        if (data.error) {
          setError(true);
        } else {
          setSuccess(true);
          setError("");
          setName("");
        }
      })
      .catch((error) => console.log("error found"));
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-4 offset-sm-4">
          <div
            style={{ display: error ? "" : "none" }}
            className="alert alert-success"
          >
            update feild <span className="badge badge-danger">{name}</span>
          </div>
        </div>
      </div>
    );
  };

  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-4 offset-sm-4">
          <div
            style={{ display: success ? "" : "none" }}
            className="alert alert-success"
          >
            categery updated <span className="badge badge-danger">{name}</span>
          </div>
        </div>
      </div>
    );
  };

  const updateCategoryForm = () => {
    return (
      <div className="form-group bg-white">
        <h3>
          {" "}
          <span className="text-dark">Enter The Category</span>
        </h3>
        <input
          value={name}
          onChange={handleChange}
          type="text"
          className="form-control my-3"
          autoFocus
          required
          placeholder="For ex.. Summer"
        />
        <button onClick={handleClick} type="submit" className="btn btn-dark">
          update Category
        </button>
      </div>
    );
  };

  setTimeout(() => {
    return success && setGetRedirect(true);
  }, 1000);

  const redirectPerform = () => {
    if (getRedirect) {
      return <Redirect to="/admin/categories" />;
    }
  };

  return (
    <Base
      title="Create category here"
      description="create new product category here"
    >
      {success && successMessage()}
      {error && errorMessage()}
      {redirectPerform()}
      <div className="col-md-8 offset-sm-2 bg-white p-1">
        {goBack()}
        {updateCategoryForm()}
      </div>
    </Base>
  );
}

export default UpdateCategories;
