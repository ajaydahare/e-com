import React, { useState,useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { isAuthenticate } from '../auth/helper';
import Base from '../core/Base'
import { updateProduct, getAllCategory,getProduct } from './helper/adminapicall';

function UpdateProduct({match}) {

    const [values, setvalues] = useState({
        name:"",
        description:"",
        stock:"",
        price:"",
        photo:"",
        categories:[],
        category:"",
        error:"",
        updatedProduct:"",
        getRedirect:false,
        formdata:""

    });

    const {name,description,stock,price,categories, error, updatedProduct, getRedirect, formdata}=values;

    const {user,token}=isAuthenticate();

    const preload=(productId)=>{
        getProduct(productId)
        .then(data=>{
            if(data.error){
                setvalues({...values,error:data.error})
            }else{
                setvalues({
                    ...values,
                    name:data.name,
                    description:data.description,
                    stock:data.stock,
                    price:data.price,
                    formdata:new FormData()
                });
                preloadCategories()
            }
        })
    }

    const preloadCategories=()=>{
        getAllCategory()
        .then(data=>{
            if(data.error){
                setvalues({...values,error:data.error})
            }else{
                setvalues({categories:data,formdata:new FormData()})
            }
        })
    }

    useEffect(() => {
       preload(match.params.productId);
    },[]);

    const handleChange=(event)=>{
         const value= event.target.name==="photo" ? event.target.files[0] : event.target.value
         formdata.set(event.target.name,value)
         setvalues({...values,[event.target.name]:value})
    }

    const handleClick=(event)=>{
        event.preventDefault();
        setvalues({...values,error:"",loading:true})
        updateProduct(match.params.productId,user._id,token,formdata)
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
                    updatedProduct:data.name,
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
               <div style={{display:updatedProduct?"":"none"}} className="alert alert-success">
               
               <h3 className="badge badge-danger">{updatedProduct}</h3>  updated successfully
               </div>
            </div>
        </div>
        )
    }

    setTimeout(() => {
        return  updatedProduct && setvalues({...values,getRedirect:true})
    }, 2000);

    const redirectPerform=()=>{
        if(getRedirect){
          return <Redirect to="/admin/products" /> 
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
            Update Product
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
            <Link to="/admin/products" className="btn btn-sm btn-info m-1">Back</Link>
                {createProductForm()}
            </div>
        </div>
        </div>
       </Base>
    )
}

export default UpdateProduct;