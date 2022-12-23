import { CssBaseline } from "@mui/material";
import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./Components/Layout";
import DailyTournament from "./Pages/ActiveUser/DailyTournament/DailyTournament";
import Home from "./Pages/ActiveUser/Home";
import Question from "./Pages/ActiveUser/Question";
import Tournament from "./Pages/ActiveUser/Tournament";
import AdminLayout from "./Pages/Admin/Admin";
import Dashboard from "./Pages/Admin/Components/Dashboard/Dashboard";
import Questions from "./Pages/Admin/Components/Questions/Question";
import ToDo from "./Pages/Admin/Components/To-do/ToDo";
import SignIn from "./Pages/Auth/SignIn";
import SignUp from "./Pages/Auth/SignUp";
import InActiveUser from "./Pages/InAvtiveUser";
function App() {
  const token = localStorage.getItem("token");
  const userRole = JSON.parse(localStorage.getItem("user"));

  console.log(userRole , "Bu userRole");
  return (
    <div className="App">
      <CssBaseline />

      {token === null  ? (
        <Routes>
          <Route path="/" element={<InActiveUser />} />
          <Route path="/auth/login" element={<SignIn />} />
          <Route path="/auth/register" element={<SignUp />} />
          <Route path="*" element={<Navigate to={"/"} />} />
        </Routes>
      ) : userRole?.userRole === "USER" &&  token !== null ?  (
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/user" element={<Home />} />
            <Route path="/user/question" element={<Question />} />
            <Route path="/user/tournament" element={<Tournament />} />
            <Route
              path="/user/daily-tournament"
              element={<DailyTournament />}
            />
          </Route>
          <Route path="*" element={<Navigate to={"/user"} />} />
        </Routes>
      ) : userRole?.userRole === "ADMIN" && token !== null ? (

        <Routes>
          <Route element={<AdminLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/todo" element={<ToDo />} />
            <Route path="/dashboard/question" element={<Questions />} />
            <Route path="*" element={<Navigate to={"/dashboard"} />} />
          </Route>
        </Routes>
      ): null}

    </div>
  );
}

export default App;
