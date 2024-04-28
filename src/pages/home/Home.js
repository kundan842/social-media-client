import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Feed from '../../components/Feed/Feed'
import { Outlet } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch } from "react-redux";
import { getMyInfo } from "../../redux/slices/appConfigSlice";
function Home() {
  console.log('home renderd')
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMyInfo())
  }, [])
  return (
    <div>
    <Navbar></Navbar>
    <Outlet></Outlet>
  </div>
  )
}

export default Home