import React from 'react';
import Navbar from './Navbar';


const Base=({title,description,className="bg-dark text-white p-4",children})=> {
    return (
        <>
        <div className="container-fluid ">
        <Navbar />
            <div className=" bg-dark text-white text-center">
                <h2 className="display-4">{title}</h2>
                <p className="lead">{description}</p>
            </div>
            <div className={className}>{children}</div>
            <footer className="footer bg-dark mt auto ">
                <div className="container-fluid bg-info text-white text-center py-3">
                    <h4> if you got any questions , feel free to react out</h4>
                    <button className="btn btn-warning btn-lg">Contant Us  </button>
                </div>
                <div className="container text-center mt-3">
                    <span className="text-muted">
                        an Amazing platform for Do shopping with cheap rates
                    </span>
                </div>
            </footer>
        </div>
        </>
    )
}

export default Base;
