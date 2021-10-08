import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import { signup } from '../auth/helper';
import Base from "../core/Base";

function Signup() {
    const [values,setValues]=useState({
        name:"",
        email:"",
        password:"",
        error:"",
        success:false
    });


    const {name,email,password,error,success}=values

    const handleChange=(event)=>{
            setValues({...values,error:false,[event.target.name]:event.target.value})
    }

    const handleSubmit=(event)=>{
            event.preventDefault();
            setValues(values)
            signup({name,email,password})
            .then(data=>{
                if(data.error){
                    setValues({...values,error:data.error,success:false})
                }else{
                    setValues({...values,name:"",email:"",password:"",success:data.message})
                }
            })
            .catch(console.log("error in signup"))
            
    }

    const succesMessage=()=>{
        return (<div className="row">
            <div className="col-md-4 offset-sm-4">
               <div style={{display:success?"":"none"}} className="alert alert-success">
                   {success} please  <Link to="/signin">sign in</Link>
               </div>
            </div>
        </div>)
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

    const signUpForm=()=>{
        return (
            <div className="row">
                <div className="col-md-4 offset-sm-4 text-left">
                    <form>
                        <div className="form-group">
                        <lable className="text-light">Name</lable>
                            <input onChange={handleChange} className="form-control" placeholder="Name" name="name" type="text" value={name}/>
                            
                        </div>
                        <div className="form-group">
                            <lable className="text-light">Email</lable>
                            <input onChange={handleChange} className="form-control" placeholder="Email" name="email" type="text" value={email}/>
                        </div>
                        <div className="form-group">
                            <lable className="text-light">Password</lable>
                            <input onChange={handleChange} className="form-control" placeholder="password" name="password" type="text" value={password}/>
                        </div>
                      
                        <button onClick={handleSubmit} type="submit" className="btn btn-success btn-block">Submit</button>
                    </form>
                  
                </div>
            </div>
        )
    }

    return (
       <Base title="signup page" description="sign up with your email and password">
       {succesMessage()}
       {errorMessage()}
       {signUpForm()}
       </Base>
    )
}

export default Signup