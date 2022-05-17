import React from "react";
import axios from "axios";


const axiosBase = axios.create({
    baseURL: process.env.REACT_APP_BASE
});

export default axiosBase;