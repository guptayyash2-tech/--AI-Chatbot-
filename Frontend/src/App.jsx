import { useEffect } from "react";
import Home from "./Home";
import Innerchat from "./innerchat/Innerchat";
import AccountSection from "./Userlogin/Account";
import Login from "./Userlogin/Login";
import RegisterPage from "./Userlogin/Regiser";
import { Routes, Route } from "react-router-dom";
import { SetAuthToken } from "./Api";

function App() {



  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/chatpage" element={<Innerchat />} />
      <Route path="/account" element={<AccountSection />} />
    </Routes>
  );
}

export default App;
