import React, { useState } from "react";
import axiosBase from "../helper/axios";
import { Link, useNavigate } from "react-router-dom";
import Toastify from "toastify-js";

export default function Student(){

    const [ name, SetName ] = useState();
    const [ age, SetAge ] = useState();
    const [ gender, SetGender ] = useState();

    const Navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        SetName("");
        SetAge("");
        SetGender("")
    }

    function Submit(e){
        e.preventDefault();
        const Data = { name, age, gender }
        axiosBase.post("/add", Data).then(()=>{
            Toastify({
                text: "Success ! Student Added",
                gravity: "bottom",
                duration: "5000",
                close: true,
                style: {
                    background: "linear-gradient(to right, #000000, #000000)",
                    borderTop:"solid #00c851"
                },
            }).showToast();
            handleSubmit(e)
            Navigate("/index")

        }).catch((err)=>{
            Toastify({
                text:`${err}`,
                gravity: "bottom",
                duration: "6000",
                close: true,
                style: {
                    background: "linear-gradient(to right, #000000, #000000)",
                    borderTop:"solid #F32013"
                },
            }).showToast();
        })
    }

    return(
        <div className="mt-3">
            <Link to="/index" className="btn btn-primary mt-2 me-5" style={{ float:"right" }}>
                <i className="fa-solid fa-house-chimney me-2"/>Home</Link>
            <h4 className="display-6 mx-5">Let's add a Student</h4>
            <hr className="mx-3"/>
            <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
                <symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                </symbol>
            </svg>
        <div className="container mt-5 card" style={{ width:"600px" }}>
            <form onSubmit={ Submit } className="card-body">
                <div className="mb-3">
                    <label className="form-label fw-bold">Name</label>
                    <input value={ name } type="text" className="form-control" id="name" placeholder="Enter name"
                           onChange={(e)=>{ SetName(e.target.value); }}
                           required={true} autoComplete="off"/>
                </div>
                <div className="mb-3">
                    <label className="form-label fw-bold">Age</label>
                    <input value={ age } type="number" className="form-control" id="age" placeholder="Enter Age"
                           onChange={(e)=>{ SetAge(e.target.value); }}
                           required={true} autoComplete="off"/>
                </div>
                <div className="mb-3">
                    <label className="form-label fw-bold">Gender</label>
                    <input value={ gender } type="text" className="form-control" id="gender" placeholder="Enter Gender"
                           onChange={(e)=>{ SetGender(e.target.value); }}
                           required={true} autoComplete="off"/>
                </div>
                <div className="col-md-12 text-center">
                    <button type="submit" className="btn btn-primary mx-3"><i className="fa-solid fa-floppy-disk me-1"/>SAVE</button>
                    <button type="reset" className="btn btn-outline-primary"><i className="fa-solid fa-arrow-rotate-right me-1"/>RESET</button>
                </div>
            </form>
        </div>
        </div>
    );
}