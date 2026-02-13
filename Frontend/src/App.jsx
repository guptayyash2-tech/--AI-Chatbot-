import Home from "./Home";
import Innerchat from "./innerchat/Innerchat";
import AccountSection from "./Userlogin/Account";
import Login from "./Userlogin/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom"
function App() {
  return (
  <>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/signup" element={<Login />} />
    <Route path="/chatpage" element={<Innerchat />} />
    <Route path="/account" element={<AccountSection />} />
  </Routes>
  </>
  );
}

export default App;