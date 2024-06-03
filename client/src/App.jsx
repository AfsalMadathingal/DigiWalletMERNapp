import React from "react";
import { useState } from "react";
import "./App.css";
import Header from "./Components/Header";
import Landing from "./Pages/Landing/Landing";
import { Routes, Route, useLocation , } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Login from "./Pages/Login/Login";
import SignUp from "./Pages/SignUp/SignUp";
import About from "./Pages/About/About";
import Home from './Pages/Home/Home'
import AdminLogin from "./Pages/Admin/Login/AdminLogin";
import AdminNav from "./Components/AdminNav";

function App() {
  const location = useLocation();

  return (
    <>
        {location.pathname.includes("/admin") ? <AdminNav/> : <Header />}
      <TransitionGroup className="transition-group">
        <CSSTransition key={location.key} classNames="zoom" timeout={300}>
          <Routes location={location}>
      
            {/* publicRoutes */}
            <Route path="*" element={<Landing />} />
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/about" element={<About />} />

            {/* userRoutes */}
            <Route path="/home" element={<Home />} />

            {/* AdminRoutes */}
            <Route path="/admin/login" element={<AdminLogin />} />

            

           

           
          </Routes>
        </CSSTransition>
      </TransitionGroup>
    </>
  );
}

export default App;
