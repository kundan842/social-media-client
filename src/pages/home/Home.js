import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Feed from '../../components/Feed/Feed'
import { Outlet } from 'react-router-dom'
function Home() {
  console.log('home renderd')
  return (
    <div><>
    <Navbar></Navbar>
    <Outlet></Outlet>
    </></div>
  )
}

export default Home