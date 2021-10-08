import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { isAuthenticate } from '../auth/helper';
import Base from '../core/Base'
import { createCategory } from './helper/adminapicall';

function AddCategory() {
    const [name,setName]=useState("");
    const [error,setError]=useState(false);
    const [success,setSuccess]=useState(false);

    const{ user,token}=isAuthenticate();

    const goBack=()=>{
        return (
            <div className="m-2">
                <Link to="/admin/dashboard" ><button className="btn btn-sm btn-info">Back</button></Link>

            </div>
        )
    }

    const handleChange=(event)=>{
        setName(event.target.value)
    }

    const handleClick=(event)=>{
        event.preventDefault();
        setError("");
        setSuccess(false)
        createCategory(user._id,token,{name})
        .then(data=>{
            if(data.error){
                setError(true)
            }else{
                setSuccess(true)
                setError("")
                setName("")
            }
            
        })
        .catch(error=>console.log("error found"))
    }
    const errorMessage=()=>{
        return (
            <div className="row">
            <div className="col-md-4 offset-sm-4">
               <div style={{display:error?"":"none"}} className="alert alert-success">
                  already have category of <span className="badge badge-danger">{name}</span>
               </div>
            </div>
        </div>
        )
    }
    const successMessage=()=>{
        return (
            <div className="row">
            <div className="col-md-4 offset-sm-4">
               <div style={{display:success?"":"none"}} className="alert alert-success">
                  categery added <span className="badge badge-danger">{name}</span>
               </div>
            </div>
        </div>
        )
    }
    const addCategoryForm=()=>{
        return(
            <div className="form-group bg-white">
            <h3> <span className="text-dark">Enter The Category</span></h3>
                <input value={name} onChange={handleChange} type="text" className="form-control my-3" autoFocus  required placeholder="For ex.. Summer" />
               <button onClick={handleClick} type="submit" className="btn btn-dark">Add Category</button>
            </div>
        )
    }

    return (
       <Base title="Create category here" description="create new product category here">
       {success && successMessage()}
        {error && errorMessage()}
        <div className="col-md-8 offset-sm-2 bg-white p-1">
            {goBack()}
            {addCategoryForm()}
        </div>
       </Base>
    )
}

export default AddCategory;
