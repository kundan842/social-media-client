
import { Route, Routes } from "react-router-dom";
import Signup from "./pages/signup/Signup";
import Login from "./pages/login/login";
import Home from "./pages/home/Home";
import RequireUser from "./components/RequireUser";
import { useEffect } from "react";
import { axioClient } from "./utils/client";
import Feed from "./components/Feed/Feed";
import Profile from "./components/Profile/Profile";
import UpdateProfile from "./components/updateProfile/UpdateProfile";

function App() {

  

  return (
   
<Routes>
  <Route  element={<RequireUser />}>
    <Route  element={<Home />}>
      <Route path="/" element={<Feed></Feed>}></Route>
      <Route path="/profile/:userId" element={<Profile></Profile>}></Route>
      <Route path="/updateProfile" element={<UpdateProfile></UpdateProfile>}></Route>
    </Route>
    
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
  </Route>
</Routes>

  )
}

export default App;
