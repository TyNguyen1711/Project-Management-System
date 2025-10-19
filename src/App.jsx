import { useState } from "react";
import "./App.css";
import loginSuccess from "./assets/login-success.png";
import { Routes, Route } from "react-router-dom";
import LoginComponent from "./pages/Login";
function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginComponent />} />
      </Routes>
    </>
  );
}

export default App;
