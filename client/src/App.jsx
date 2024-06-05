import React from "react";
import { useState } from "react";
import "./App.css";
import Header from "./Components/Header";
import Landing from "./Pages/Landing/Landing";
import { Routes, Route, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Login from "./Pages/Login/Login";
import SignUp from "./Pages/SignUp/SignUp";
import About from "./Pages/About/About";
import Home from "./Pages/Home/Home";
import AdminLogin from "./Pages/Admin/Login/AdminLogin";
import AdminNav from "./Components/AdminNav";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./Components/PrivateRoute";
import PublicRoute from "./Components/PublicRoute";
import UserDashboard from "./Components/UserDashboard";
import PrivateRouteAdmin from "./Components/PrivateRoute";
import PublicRouteAdmin from "./Components/PublicRouteAdmin";
import AdminDashboard from "./Pages/Admin/Dashboard/AdminDashboard";

function App() {
  const location = useLocation();

  return (
    <>
      <ToastContainer theme="dark" position="top-center" autoClose={2000} />
      {location.pathname.includes("/admin") ? <AdminNav /> : <Header />}
      <TransitionGroup className="transition-group">
        <CSSTransition key={location.key} classNames="zoom" timeout={300}>
          <Routes location={location}>
            <Route element={<PublicRoute />}>
              <Route path="*" element={<Landing />} />
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
            </Route>
            <Route path="/about" element={<About />} />
            <Route element={<PublicRouteAdmin />}>
              <Route path="/admin/login" element={<AdminLogin />} />
            </Route>
            <Route element={<PrivateRoute />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
            </Route>
            <Route element={<PrivateRouteAdmin />}></Route>
          </Routes>
        </CSSTransition>
      </TransitionGroup>
    </>
  );
}

export default App;
