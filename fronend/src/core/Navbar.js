import React from 'react';
import {Link,withRouter,useHistory} from "react-router-dom";
import { isAuthenticate, signout } from '../auth/helper';

const currentTab=(History,path)=>{
    if(History.location.pathname===path){
        return {color:"#5dc7b9"}
    }else{
        return {color:"#edf2f2"}
    }
}

const Navbar=(History)=> {
    let history=useHistory();
    return (
        <div>
            <ul className="nav nav-tabs bg-dark">
                <li className="nav-item">
                    <Link style={currentTab(History,"/")} className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item">
                    <Link style={currentTab(History,"/cart")} className="nav-link" to="/cart">Cart</Link>
                </li>
                {isAuthenticate() && isAuthenticate().user.role===0 &&(
                <li className="nav-item">
                    <Link style={currentTab(History,"/user/dashboard")} className="nav-link" to="/user/dashboard">Dashboard</Link>
                </li>
                )}
                {isAuthenticate() && isAuthenticate().user.role===1 &&(
                    <li className="nav-item">
                    <Link style={currentTab(History,"/admin/dashboard")} className="nav-link" to="/admin/dashboard"> Admin Dashboeard</Link>
                </li>
                )}
               
                {!isAuthenticate() &&
                <>
                <li className="nav-item">
                    <Link style={currentTab(History,"/signin")} className="nav-link" to="/signin">Sign in</Link>
                </li>
                
               
                <li className="nav-item">
                    <Link style={currentTab(History,"/signup")} className="nav-link" to="/signup">Sign Up</Link>
                </li>
                </>
                }
                {isAuthenticate() && 
                (<li className="nav-item">
                    <Link style={currentTab(History,"/signout")} className="nav-link"  onClick={()=>{
                        signout(()=>{
                        history.push('/')
                        })
                    }} >Sign Out</Link>
                </li>)
                }
                
            </ul>
        </div>
    )
}

export default withRouter(Navbar);
