
import Home from "./Home";
import Innerchat from "./innerchat/Innerchat";

import Login from "./Userlogin/Login";
import RegisterPage from "./Userlogin/Regiser";
import { Routes, Route } from "react-router-dom";
import { SetAuthToken } from "./Api";
import AccountPage from "./Userlogin/Account";

function App() {



  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/chatpage" element={<Innerchat />} />
      <Route path="/account" element={<AccountPage />} />
    </Routes>
  );
}

export default App;
