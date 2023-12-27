import React from "react"
import { useSelector } from "react-redux"
import { NavLink, useLocation } from "react-router-dom"

export function AdminHeader() {
  const location = useLocation()
  const user = useSelector(storeState => storeState.userModule.loggedinUser)

  if (!user) return
  return (
    <>
    {location.pathname.includes('/admin') && <header className="admin-header flex full">
      <nav className="admin-nav flex align-center">
        <NavLink to="/toy" >Toy</NavLink>
      </nav>
    </header>}
    </>
  )
}
