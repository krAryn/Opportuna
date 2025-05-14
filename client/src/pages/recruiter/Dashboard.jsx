import React from 'react'
import { Outlet } from 'react-router'

const Dashboard = () => {
  return (
    <div>
        Recruiter Dashboard
        <Outlet />
    </div>
  )
}

export default Dashboard
