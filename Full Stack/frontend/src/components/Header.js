import React from "react";
import logo from "./images/favicon.png"
import { Link } from "react-router-dom";

export default function Header() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container-fluid">
                <button
                    className="navbar-toggler"
                    type="button"
                    data-mdb-toggle="collapse"
                    data-mdb-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <i className="fas fa-bars"/>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <Link to="/index" className="navbar-brand mt-2 mt-lg-0">
                            <img
                                src={ logo }
                                height="30"
                                alt="Logo"
                                loading="lazy"
                                className="me-3"
                            />
                            Student Management System
                        </Link>
                    </ul>
                </div>
            </div>
        </nav>
    );
}



