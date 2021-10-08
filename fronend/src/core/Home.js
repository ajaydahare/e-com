import React, { useEffect, useState } from 'react';
import { getAllProduct } from '../admin/helper/adminapicall';
import Base from "./Base";
import Card from './Card';
 
function Home() {
  const [products,setProducts]=useState([])
  const [error,setError]=useState("")

    const preload=()=>{
      getAllProduct()
      .then(data=>{
        if(data.error){
          return setError(data.error)
        }else{
          setProducts(data)
        }
      })
    }

    useEffect(()=>{
      preload()
    },[]);

    return (
       <Base title="Shopping Card" description="welcome to an amazing platform to do shopping with cheap rates">
       <div className="container">
         <div className="row">
         {products.map((product,index)=>{
           return  <div key={index} className="col-md-4  col-sm-6 d-flex align-items-stretch"><Card product={product} /></div>
         })}
         </div>
       </div>
       </Base>
    )
}

export default Home;
