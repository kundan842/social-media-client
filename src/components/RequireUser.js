import React from 'react'
import { LOCAL_STORAGE_TOKEN_KEY, getItem } from '../utils/storageManager'
import { Navigate, Outlet } from 'react-router-dom'

function RequireUser() {
    const accessToken = getItem(LOCAL_STORAGE_TOKEN_KEY)
    console.log('inside requireUser')
  return (
    accessToken ? <Outlet/> : <Navigate  to="/login" />
  )
}

export default RequireUser