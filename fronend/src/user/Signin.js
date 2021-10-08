import React,{useState} from 'react';
import Base from "../core/Base";

import { authenticate, isAuthenticate, signin } from '../auth/helper';
import { Redirect } from 'react-router';

function Signin() {

    const [values,setValues]=useState({
            email:"",
            password:"",
            error:"",
            loading:false,
            didRedirect:false
    });

    const {email,password,error,loading,didRedirect}=values;

    const {user}=isAuthenticate();

    const handleChange=(event)=>{
        setValues({...values,error:false,[event.target.name]:event.target.value})
    }

    const handleSubmit=(event)=>{
        event.preventDefault();
        setValues({...values,error:false,loading:true});
        signin({email,password})
        .then(data=>{
            if(data.error){
                setValues({...values,error:data.error,loading:false})
            }else{
                authenticate(data,()=>{
                    setValues({
                        ...values,
                        email:"",
                        password:"",
                        didRedirect:true
                    })
                })
            }
        })
        .catch(()=>console.log("sign in failed"))
    }

    const performRedirect=()=>{
        if(didRedirect){
            if(user && user.role===1){
                return <Redirect to="/admin/dashboard" />
            }else{
                return <Redirect to="/user/dashboard" />
            }
        }
        if(isAuthenticate()){
            return <Redirect to="/" />
        }
    }

    const loadingMessage=()=>{
        return(
            loading && (
                <div className="row">
        <div className="col-md-4 offset-sm-4">
           <div  className="alert alert-info">
              <h2>Loading...</h2>
           </div>
        </div>
    </div>
            )
        )
    }

const errorMessage=()=>{
    return (<div className="row">
        <div className="col-md-4 offset-sm-4">
           <div style={{display:error?"":"none"}} className="alert alert-danger">
               {error}
           </div>
        </div>
    </div>)
}
    const signInForm=()=>{
        return (
            <div className="row">
                <div className="col-md-4 offset-sm-4 text-left">
                    <form>
                    <div className="form-group">
                            <lable className="text-light">Email
                            <input onChange={handleChange} className="form-control" placeholder="Email" name="email" type="text" value={email}/>
                            </lable>
                        </div>
                        <div className="form-group">
                            <lable className="text-light">Password
                            <input onChange={handleChange} className="form-control" placeholder="password" name="password" type="text" value={password}/>
                            </lable>
                        </div>
                      
                        <button onClick={handleSubmit} type="submit" className="btn btn-success btn-block">Submit</button>
                    </form>
                </div>
            </div>
        )
    }

    return (
       <Base title="signin page" description="sign in with your email and password">
       {loadingMessage()}
       {errorMessage()}
        {signInForm()}
        {performRedirect()}
       
       </Base>
    )
}

export default Signin
