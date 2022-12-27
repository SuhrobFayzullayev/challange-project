import { CssBaseline } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, json } from "react-router-dom";
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
import "./App.scss";
import Yesterday from "./Pages/Admin/Components/To-do/Yesterday";
import YesterdayBefore from "./Pages/Admin/Components/To-do/YesterdayBefore";
import Today from "./Pages/Admin/Components/To-do/Today";
try {
  axios
    .get("https://challange.onrender.com/api/v1/calendars/3", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      localStorage.setItem(
        "calendar",
        JSON.stringify(res.data.data.CalendarById)
      );
    });
} catch (error) {
  console.log(error);
}

function App() {
  const token = localStorage.getItem("token");
  const userRole = JSON.parse(localStorage.getItem("user"));

  const { month, day, year, time, totalDay } = JSON.parse(
    localStorage.getItem("calendar")
  );

  const deadline = `${month}, ${day}, ${year}, ${time.slice(0, 2).trim()}:${time
    .slice(3, 5)
    .trim()}`;
  const times = Date.parse(deadline) - Date.now();

  localStorage.setItem(
    "activeDay",
    JSON.stringify(totalDay - Math.floor(times / (1000 * 60 * 60 * 24)))
  );


  return (
    <div className="App">
      <CssBaseline />

      {token === null ? (
        <Routes>
          <Route path="/" element={<InActiveUser />} />
          <Route path="/auth/login" element={<SignIn />} />
          <Route path="/auth/register" element={<SignUp />} />
          <Route path="*" element={<Navigate to={"/"} />} />
        </Routes>
      ) : userRole?.userRole === "USER" && token !== null ? (
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
            <Route element={<ToDo />}>
              <Route path="/dashboard/todo/today" element={<Today />} />
              <Route path="/dashboard/todo/yesterday" element={<Yesterday />} />
              <Route
                path="/dashboard/todo/yesterday-before"
                element={<YesterdayBefore />}
              />
            </Route>
            <Route path="/dashboard/question" element={<Questions />} />
            <Route path="*" element={<Navigate to={"/dashboard"} />} />
          </Route>
        </Routes>
      ) : null}
    </div>
  );
}

export default App;
