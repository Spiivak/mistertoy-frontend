import React from "react"
import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"

export function AdminHeader() {
  const user = useSelector(storeState => storeState.userModule.loggedinUser)
  console.log('AdminHeader  user:', user)

  if (!user) return
  return (
    <React.Fragment>
    {user.isAdmin && <div className="admin-header">
      <nav className="admin-nav flex">
        <NavLink to="/admin" >Admin</NavLink>
      </nav>
    </div>}
    </React.Fragment>
  )
}
