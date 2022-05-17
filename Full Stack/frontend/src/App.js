import React from 'react';
import {BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Student from "./components/Student";
import Table from "./components/Table";
import NotFound from "./components/NotFound";
import "toastify-js/src/toastify.css"
import Index from "./components";

export default function App() {

  return (
      <BrowserRouter>
      <Header/>
        <Routes>
            <Route path="/notfound" element={<NotFound/>}/>
            <Route path="/add" element={<Student/>}/>
            <Route path="/index" element={<Table/>}/>
            <Route index element={<Index/>}/>
        </Routes>
      </BrowserRouter>
  );
}