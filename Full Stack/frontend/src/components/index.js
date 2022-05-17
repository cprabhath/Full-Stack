import React from "react";
import myImage from "./images/icons8-google-96.png"

export default function Index(){
    return(
        <div className="card mt-5 w-25 mx-auto my-auto">
            <div className="card-body">
                <ul className="nav nav-pills nav-justified mb-3">
                    <p className="display-6 mx-auto fw-bold">Login</p>
                </ul>
                <div className="tab-content">
                    <div className="tab-pane fade show active" aria-labelledby="tab-login">
                        <form>
                            <div className="form mb-4">
                                <label className="form-label fw-bold">Email or username</label>
                                <input type="email" id="loginName" className="form-control" placeholder="Enter username or Email"/>
                            </div>

                            <div className="form mb-4">
                                <label className="form-label fw-bold">Password</label>
                                <input type="password" id="loginPassword" className="form-control" placeholder="Enter Password"/>
                            </div>
                            <button type="submit" className="btn btn-primary btn-block mb-4">Sign in</button>

                            <div className="text-center d-grid gap-2">
                                <hr/>
                                <button type="button" className="btn">
                                   <img src={myImage} width="18" style={{float:"left"}} alt="Logo"/> Login with Google
                                </button>
                                <button type="button" className="btn ">
                                    <i className="fab fa-facebook-f me-2" style={{float:"left"}}/>Login with Facebook
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}