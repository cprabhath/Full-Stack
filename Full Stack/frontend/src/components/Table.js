import React, { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import swal from "sweetalert";
import axiosBase from "../helper/axios";
import "./CSS/table.css"
import Toastify from "toastify-js";

export default function Table() {
    const [ students, getAllStudent ] = useState([])
    const Navigate = useNavigate()
    const [ name , getName ] = useState();
    const [ age , getAge ] = useState();
    const [ gender , getGender ] = useState();
    const [ ID , getID ] = useState();

    useEffect(  () => {
       getData()
    },[students])

    function getData() {
        axiosBase.get("/")
            .then( async res => {
               await getAllStudent(res.data)
            }).catch( err => {
                Navigate("/notfound")
            Toastify({
                text: `${err}`,
                className: "info",
                gravity: "bottom",
                close: true,
                style: {
                    background: "linear-gradient(to right, #000000, #000000)",
                    borderTop:"solid #F32013"
                },
            }).showToast();
        })
    }

    const showHandle = (id,e) => {
        e.preventDefault()
       axiosBase.get(`/get/${id}`).then(res => {
           getName(res.data.name)
           getAge(res.data.age)
           getGender(res.data.gender)
           getID(res.data._id)
       })
    }

    const UpdateStudent = (e) =>{
        e.preventDefault()
        const data = { name, age, gender }
        axiosBase.put(`/update/${ID}`, data).then(()=>{
            Toastify({
                text: "Success ! Student Updated",
                gravity: "bottom",
                close: true,
                style: {
                    background: "linear-gradient(to right, #000000, #000000)",
                    borderTop:"solid #00c851"
                },
            }).showToast();
        }).catch(err => {
            Toastify({
                text:`${err}`,
                gravity: "bottom",
                close: true,
                style: {
                    background: "linear-gradient(to right, #000000, #000000)",
                    borderTop:"solid #F32013"
                },
            }).showToast();
        })
    }

    const DeleteStudent = (id, e) => {
        e.preventDefault()
        return(
            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover this!",
                buttons: true,
                dangerMode: true,
            }).then((willDelete) => {
                    if (willDelete) {
                        axiosBase.delete(`/delete/${id}`).then(()=>{
                            Toastify({
                                text: "Success ! Student Deleted",
                                gravity: "bottom",
                                duration: "5000",
                                close: true,
                                style: {
                                    background: "linear-gradient(to right, #000000, #000000)",
                                    borderTop:"solid #00c851"
                                },
                            }).showToast();
                        }).catch(err => {
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
            })
        )
    }

    const deleteAll = (e) =>{
        e.preventDefault()
        if(students.length === 0 )
       return(
           swal({
               title: "Table is empty",
               icon: "error",
               button: true
           })
       )
        if (students.length !== 0)
            return swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover this!",
                buttons: true,
                dangerMode: true,
            }).then((willDelete) => {
                if (willDelete) {
                    axiosBase.delete('/delete').then(()=>{
                        Toastify({
                            text:"All students are deleted successfully!",
                            gravity: "top",
                            position: "center",
                            duration: "6000",
                            close: true,
                            style: {
                                background: "linear-gradient(to right, #000000, #000000)",
                                borderTop:"solid #F32013"
                            },
                        }).showToast();
                    }).catch(err => {
                        Toastify({
                            text:`${err}`,
                            gravity: "top",
                            duration: "6000",
                            close: true,
                            style: {
                                background: "linear-gradient(to right, #000000, #000000)",
                                borderTop:"solid #F32013"
                            },
                        }).showToast();
                    })
                }
            })
    }

    const CheckEmpty = () => {
        if ( students.length === 0 ){
            return(
                <div className="alert alert-info" style={{ textAlign:"center"}} role="alert">
                    <h4 className="alert-heading">No Student Founded!</h4>
                </div>
            )
        }
    }
    return (
        <>
        <div className="mx-3 mt-3">
                <div className="mx-5">
                    <button type="button" className="btn btn-primary mt-2" style={{ float:"right" }}
                            onClick={(e) =>{deleteAll(e).then()}}>
                        <i className="fa-solid fa-trash-can me-2"/>
                        Delete all
                    </button>
                    <Link to="/add" className="btn btn-secondary mt-2 me-2" style={{ float:"right" }}>
                        <i className="fa-solid fa-plus me-2"/>Create</Link>
                    <h4 className="display-6">
                        { students ? students.length : undefined } {" "}
                        Students loaded from the database
                    </h4>
                </div>
            <hr className="mt-3"/>
            <div className="container mt-4">
                <div className="card">
                    <div className="card-body">
                        <table className="table table-hover table-responsive-md" id="table">
                            <thead>
                            <tr style={{ textAlign:"center" }}>
                                <th className="col-1 h5">#</th>
                                <th className="col-2 h5">Name</th>
                                <th className="col-3 h5">Age</th>
                                <th className="col-1 h5">Gender</th>
                                <th className="col-4 h5">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {students.map((student , id) =>
                                <tr key={id} style={{ textAlign:"center" }}>
                                    <td className="fw-bold text-muted">{ id+1 }</td>
                                    <td className="fw-bold text-muted">{student.name}</td>
                                    <td className="fw-bold text-muted">{student.age}</td>
                                    <td className="fw-bold text-muted">{student.gender}</td>
                                    <td>
                                        <button onClick={(e)=>{ showHandle (student._id, e)}}
                                                className="btn btn-outline-primary btn-sm me-2" data-mdb-toggle="modal" data-mdb-target="#View">
                                            <i className="fa-solid fa-eye me-1"/>View</button>
                                        <button onClick={(e)=>{ showHandle (student._id, e)}}
                                                className="btn btn-outline-primary btn-sm me-2" data-mdb-toggle="modal" data-mdb-target="#exampleModal">
                                            <i className="fa-solid fa-pen me-1"/>Edit</button>
                                        <button className="btn btn-danger btn-sm"
                                                onClick={(e) => { DeleteStudent(student._id, e)
                                                    .then(res => console.log(res))}} >
                                            <i className="fa-solid fa-trash-can me-1"/>Delete</button>
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                        {
                            CheckEmpty()
                        }
                    </div>
                </div>
            </div>
        </div>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true"
                 data-mdb-backdrop="static"
                 data-mdb-keyboard="false">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Update Student</h5>
                            <button type="button" className="btn-close" data-mdb-dismiss="modal" aria-label="Close"/>
                        </div>
                        <div className="modal-body">
                            <form className="card-body">
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Name</label>
                                    <input value={ name } type="text" className="form-control" id="name"
                                           onChange={(e)=>{ getName(e.target.value); }}
                                           required={true} autoComplete="off"/>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Age</label>
                                    <input value={ age } type="number" className="form-control" id="age"
                                           onChange={(e)=>{ getAge(e.target.value); }}
                                           required={true} autoComplete="off"/>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Gender</label>
                                    <input value={ gender } type="text" className="form-control" id="gender"
                                           onChange={(e)=>{ getGender(e.target.value); }}
                                           required={true} autoComplete="off"/>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-mdb-dismiss="modal">
                                <i className="fa-solid fa-xmark me-1"/>Close</button>
                            <button type="button" className="btn btn-primary" onClick={(e)=>{ UpdateStudent(e) }} data-mdb-dismiss="modal">
                                <i className="fa-solid fa-floppy-disk me-1"/>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="View" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true"
                 data-mdb-backdrop="static"
                 data-mdb-keyboard="false">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Full Details of this Student</h5>
                            <button type="button" className="btn-close" data-mdb-dismiss="modal" aria-label="Close"/>
                        </div>
                        <div className="modal-body">
                            <form className="card-body">
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Name</label>
                                    <input value={name} type="text" className="form-control" id="name"
                                           required={true} autoComplete="off" readOnly/>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Age</label>
                                    <input value={age} type="number" className="form-control" id="age"
                                           required={true} autoComplete="off" readOnly/>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Gender</label>
                                    <input value={gender} type="text" className="form-control" id="gender"
                                           required={true} autoComplete="off" readOnly/>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-mdb-dismiss="modal">
                                <i className="fa-solid fa-xmark me-1"/>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
