import { useState } from "react";
import "./App.css";
import loginSuccess from "./assets/login-success.png";
import { Routes, Route } from "react-router-dom";
import LoginComponent from "./pages/Login";
import AppLayout from "./components/Layout";
import Home from "./pages/Home";
import MembersPage from "./pages/Member";
import TasksPage from "./pages/Task";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginComponent />} />
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/members" element={<MembersPage />} />
          <Route path="/tasks" element={<TasksPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
