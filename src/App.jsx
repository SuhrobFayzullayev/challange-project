import { CssBaseline } from "@mui/material";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout";
import DailyTournament from "./Pages/ActiveUser/DailyTournament/DailyTournament";
import Home from "./Pages/ActiveUser/Home";
import Question from "./Pages/ActiveUser/Question";
import Tournament from "./Pages/ActiveUser/Tournament";
import SignIn from "./Pages/Auth/SignIn";
import SignUp from "./Pages/Auth/SignUp";
import InActiveUser from "./Pages/InAvtiveUser";
function App() {
  const [userRole, setUserRole] = useState("InAvtiveUser");

  return (
    <div className="App">
      <CssBaseline />
      <Routes>
        <Route path="/" element={<InActiveUser />} />
        <Route path="/auth/login" element={<SignIn />} />
        <Route path="/auth/register" element={<SignUp />} />
        <Route path="" element={<Layout />}>
          <Route path="/user" element={<Home />} />
          <Route path="/user/question" element={<Question />} />
          <Route path="/user/tournament" element={<Tournament />} />
          <Route path="/user/daily-tournament" element={<DailyTournament />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
