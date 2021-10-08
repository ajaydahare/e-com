import React, { useState,useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { isAuthenticate } from '../auth/helper';
import Base from '../core/Base'
import { createProduct, getAllCategory } from './helper/adminapicall';

function AddProduct() {

    const [values, setvalues] = useState({
        name:"",
        description:"",
        stock:"",
        price:"",
        photo:"",
        categories:[],
        error:"",
        createdProduct:"",
        getRedirect:false,
        formdata:""

    });

    const {name,description,stock,price,categories, error, createdProduct, getRedirect, formdata}=values;

    const {user,token}=isAuthenticate();

    const preload=()=>{
        getAllCategory()
        .then(data=>{
            if(data.error){
                setvalues({...values,error:data.error})
            }else{
                setvalues({...values,categories:data,formdata:new FormData()})
            }
        })
    }

    useEffect(() => {
       preload();
    },[]);

    const handleChange=(event)=>{
         const value= event.target.name==="photo" ? event.target.files[0] : event.target.value
         formdata.set(event.target.name,value)
         setvalues({...values,[event.target.name]:value})
    }

    const handleClick=(event)=>{
        event.preventDefault();
        setvalues({...values,error:"",loading:true})
        createProduct(user._id,token,formdata)
        .then(data=>{
            if(data.error){
               setvalues({...values,error:data.error})
            }else{
                setvalues({
                    ...values,
                    name:"",
                    description:"",
                    stock:"",
                    price:"",
                    photo:"",
                    loading:false,  
                    createdProduct:data.name,
                    
                })
            }
        })
    }

    const errorMessage=()=>{
        return (
            <div className="row">
            <div className="col-md-4 offset-sm-4">
               <div style={{display:error?"":"none"}} className="alert alert-success">
                  {error}
               </div>
            </div>
        </div>
        )
    }
    const successMessage=()=>{
        return (
            <div className="row">
            <div className="col-md-4 offset-sm-4">
               <div style={{display:createdProduct?"":"none"}} className="alert alert-success">
               
               <h3 className="badge badge-danger">{createdProduct}</h3>  added successfully
               </div>
            </div>
        </div>
        )
    }

    setTimeout(() => {
        return  createdProduct && setvalues({...values,getRedirect:true})
    }, 1000);

    const redirectPerform=()=>{
        if(getRedirect){
          return <Redirect to="/admin/dashboard" /> 
        }
    }
 
    const createProductForm = () => (
        <form >
          <span>Post photo</span>
          <div className="form-group">
            <label className="btn btn-block btn-success">
              <input
                onChange={handleChange}
                type="file"
                name="photo"
                accept="image"
                placeholder="choose a file"
                
              />
            </label>
          </div>
          <div className="form-group">
            <input
              onChange={handleChange}
              name="name"
              className="form-control"
              placeholder="Name"
              value={name}
            />
          </div>
          <div className="form-group">
            <textarea
              onChange={handleChange}
              name="description"
              className="form-control"
              placeholder="Description"
              value={description}
            />
          </div>
          <div className="form-group">
            <input
              onChange={handleChange}
              name="price"
              type="number"
              className="form-control"
              placeholder="Price"
              value={price}
            />
          </div>
          <div className="form-group">
            <select
              onChange={handleChange}
              name="category"
              className="form-control"
              placeholder="Category"
            >
              <option>Select</option>
              {categories && categories.map((cate,index)=>{
                  return (
                      <>
                      <option key={index} value={cate._id}>{cate.name}</option>
                      </>
                  )
              })}
            </select>
          </div>
          <div className="form-group">
            <input
              onChange={handleChange}
              name="stock"
              type="number"
              className="form-control"
              placeholder="Quantity"
              value={stock}
            />
          </div>
          
          <button type="submit" onClick={handleClick} className="btn btn-outline-success">
            Create Product
          </button>
        </form>
      );
    return (
       <Base title="Add Product here" description="add new product here">
       {errorMessage()}
       {successMessage()}
       {redirectPerform()}
       <div className="container">
        <div className="row  bg-dark text-white  rounded">
            <div className="col-md-8 offset-md-2 p-2 border border-primary ">
            <Link to="/admin/dashboard" className="btn btn-sm btn-info m-1">Back</Link>
                {createProductForm()}
            </div>
        </div>
        </div>
       </Base>
    )
}

export default AddProduct;