import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import { AdminHeader } from '../cmps/admin/AdminHeader'
import {AdminAside} from '../cmps/admin/AdminAside'

export function AdminIndex() {
  const navigate = useNavigate()
  const user = useSelector(storeState => storeState.userModule.loggedinUser)
  console.log('AdminIndex  user:', user)
  useEffect(() =>{
    if (!user || !user.isAdmin) navigate('/')
  }, [])

  if (!user) return
  return (
    <section className='admin-index'>
    <AdminHeader />
    <AdminAside />
    <section className="main-admin-content">

    <Outlet />
    </section>
    </section>
  )
}
