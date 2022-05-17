import React from "react";
import "./CSS/style.css"
import { Link } from "react-router-dom";

export default function NotFound(){
    return (
        <div className="container" >
            <div className="error-template" style={{ textAlign:"center" }}>
                <h2 className="display-1">404 Not Found</h2>
                    <div>
                            Sorry, an error has occurred, Requested page not found! Please check your internet connection or<br/>
                            Your backend system is crashed
                    </div>
                <div className="error-actions">
                    <Link to="/index" className="btn btn-primary"> <i className="fa-solid fa-house me-2"/>Return </Link></div>
            </div>
        </div>
    )
}