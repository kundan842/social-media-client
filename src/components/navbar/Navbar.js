import React, { useRef, useState } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { useNavigate } from "react-router";
import Avatar from "../avatar/Avatar";
import LoadingBar from 'react-top-loading-bar'
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/slices/appConfigSlice";

function Navbar() {
    const navigate = useNavigate();
   
     const dispatch = useDispatch()
     const myProfile = useSelector(state => state.appConfigReducer.myProfile);
      console.log('insde my profile', myProfile)
    function toggleLoadingBar() {
       dispatch(setLoading(true))
    }

    return (
        <div className="Navbar">
           
            <div className="container">
                <h2 className="banner hover-link" onClick={() => navigate("/")}>
                    Social Media
                </h2>
                <div className="right-side">
                    <div
                        className="profile hover-link"
                        onClick={() => navigate(`/profile/${myProfile?._id}`)}
                    >
                        <Avatar  src={myProfile?.avatar?.url}/>
                    </div>
                    <div className="logout hover-link" onClick={toggleLoadingBar}>
                        <AiOutlineLogout />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;