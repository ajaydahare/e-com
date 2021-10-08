import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { isAuthenticate } from '../auth/helper';
import Base from '../core/Base';
import { deleteCategory, getAllCategory } from './helper/adminapicall';

function ManageCategory() {
    const [categories, setCategories] = useState([]);

    const {user,token}=isAuthenticate();

    const preload=()=>{
        return (
            getAllCategory()
            .then(data=>{
                if (data.error){
                    return console.log(data.error);
                }else{
                    setCategories(data);
                }
            }).catch(error=>console.log(error))
        )
    }

    useEffect(() => {
        preload()
    }, []);

    const deleteThisCategory=categoryId=>{
        return deleteCategory(categoryId,user._id,token)
        .then(data=>{
            if(data.error){
                return console.log(data.error)
            }else{
                preload()
            }
        })
    }
    
    return (
       
        <Base title="Welcome admin" description="Manage your Categories">
        
      <h2 className="mb-4">All Categories:</h2>
      <Link className="btn btn-info" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-white my-3">Total {categories.length} category</h2>
            {categories.map((category,index)=>{
                return (
                    <div className="row text-center mb-2 ">
            <div className="col-4">
              <h3 className="text-white text-left">{category.name}</h3>
            </div>
            <div className="col-4">
              <Link
                className="btn btn-success"
                to={`/admin/category/update/${category._id}`}
              >
                <span className="">Update</span>
              </Link>
            </div>
            <div className="col-4">
              <button onClick={() => {deleteThisCategory(category._id)}} className="btn btn-danger">
                Delete
              </button>
            </div>
          </div>
                )
            })}
          
        </div>
      </div>
    </Base>
    )
}

export default ManageCategory;