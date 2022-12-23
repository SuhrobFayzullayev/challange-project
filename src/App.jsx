import { CssBaseline } from "@mui/material";
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
function App() {
  const [userRole, setUserRole] = useState([{ user: { username: "" } }]);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUserRole(JSON.parse(localStorage.getItem("user")));
      console.log(JSON.parse(localStorage.getItem("user")));
    } else setUserRole((prev) => prev.map((v) => (v.user.username = "")));
  }, []);

  return (
    <div className="App">
      <CssBaseline />
      {userRole.map((v, i) => (
        <React.Fragment key={i}>
          <Routes>
            <Route path="/auth/login" element={<SignIn />} />
            <Route path="/auth/register" element={<SignUp />} />
            {(v?.user && (
              <>
                {v?.user?.email == "admin@gmail.com" ? (
                  <Route element={<AdminLayout />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/dashboard/todo" element={<ToDo />} />
                    <Route path="/dashboard/question" element={<Questions />} />
                    <Route path="/" element={<Navigate to={"/dashboard"} />} />
                  </Route>
                ) : (
                  <Route element={<Layout />}>
                    <Route path="/user" element={<Home />} />
                    <Route path="/user/question" element={<Question />} />
                    <Route path="/user/tournament" element={<Tournament />} />
                    <Route
                      path="/user/daily-tournament"
                      element={<DailyTournament />}
                    />
                    <Route path="/" element={<Navigate to="/user" />} />
                  </Route>
                )}
              </>
            )) || (
              <>
                <Route path="/" element={<InActiveUser />} />
                <Route path="*" element={<Navigate to="/" />} />
              </>
            )}
          </Routes>
        </React.Fragment>
      ))}
    </div>
  );
}

export default App;
