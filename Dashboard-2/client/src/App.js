import React from "react";
import Dashboard from "./Dashboard";
import {Route, Routes} from "react-router-dom";
import "./App.css";
import LandingPage from './Auth/LandingPage'
import LoginPage from './Auth/LoginPage'
import RegisterPage from './Auth/RegisterPage'
import LoadingPage from "./Pages/LoadingPage";

const App = () => {
    return (
<Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/auth/google/callback" element={<LoadingPage/>} />
</Routes>
    );
};

export default App;
