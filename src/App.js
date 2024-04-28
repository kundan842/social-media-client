
import { Route, Routes } from "react-router-dom";
import Signup from "./pages/signup/Signup";
import Login from "./pages/login/login";
import Home from "./pages/home/Home";
import RequireUser from "./components/RequireUser";
import { axioClient } from "./utils/client";
import Feed from "./components/Feed/Feed";
import Profile from "./components/Profile/Profile";
import UpdateProfile from "./components/updateProfile/UpdateProfile";
import LoadingBar from "react-top-loading-bar";
import {useSelector} from 'react-redux'
import { useEffect , useRef} from "react";
import Random from "./components/Random";
function App() {

  const isLoading = useSelector(state => state.appConfigReducer.isLoading)
    const  loadingRef= useRef(null)
    useEffect(() => {
      if(isLoading) {
          loadingRef.current?.continuousStart();
      } else {
          loadingRef.current?.complete();
      }
  }, [isLoading])
  return (
    <div className="App">
   
         <LoadingBar color='#5f9fff' ref={loadingRef} />
         <Routes>
         <Route  element={<RequireUser />}>
         <Route  element={<Home />}>
         <Route path="/" element={<Feed></Feed>}></Route>
         <Route path="/updateProfile" element={<UpdateProfile></UpdateProfile>}></Route>
         <Route path="/profile/:userId" element={<Profile></Profile>}></Route>
         </Route>
          </Route>
         <Route path="/login" element={<Login />} />
         <Route path="/signup" element={<Signup />} />
         </Routes>

    </div>
   


  )
}

export default App;
