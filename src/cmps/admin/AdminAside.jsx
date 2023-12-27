import React from 'react'
import AppLogo from '../../assets/img/mistertoy-logo.png'
import Button from '@mui/material/Button'
import { Stack } from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import PaymentsIcon from '@mui/icons-material/Payments';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import PublicIcon from '@mui/icons-material/Public';
import SellIcon from '@mui/icons-material/Sell';
import BrushIcon from '@mui/icons-material/Brush';
import SettingsIcon from '@mui/icons-material/Settings';
import { NavLink } from 'react-router-dom';

export function AdminAside() {
  const logoStyle = {
    width: '61px'
  }

  const buttonStyle = {
    color: '#3a3a3a99',
    justifyContent: 'start',
    width: '100%',
    '&:hover': {
      backgroundColor: 'rgba(255, 166, 0, 0.342)',
      fontWeight: 'medium',
      color: '#3a3a3a',
    }
  }
  const stackStyle = {
    padding: '16px',
  }

  return (
    <aside className='admin-aside flex column'>
      <div className="admin-logo">
        <img src={AppLogo} style={logoStyle} />
      </div>
      <Stack spacing={2} direction='column' sx={stackStyle}>
      <NavLink to="/admin/dashboard"><Button variant="text" sx={buttonStyle} startIcon={<DashboardIcon />}>Dashboard</Button></NavLink>
      <NavLink to="/admin/Products"><Button variant="text" sx={buttonStyle} startIcon={<Inventory2Icon />}>Products</Button></NavLink>
        <Button variant="text" sx={buttonStyle} startIcon={<ShoppingCartIcon />}>Orders</Button>
        <Button variant="text" sx={buttonStyle} startIcon={<PeopleIcon />}>Customers</Button>
        <Button variant="text" sx={buttonStyle} startIcon={<BarChartIcon />}>Statistics</Button>
        <Button variant="text" sx={buttonStyle} startIcon={<ChatBubbleIcon />}>Reviews</Button>
        <Button variant="text" sx={buttonStyle} startIcon={<PaymentsIcon />}>Transactions</Button>
        <Button variant="text" sx={buttonStyle} startIcon={<PublicIcon />}>Sellers</Button>
        <Button variant="text" sx={buttonStyle} startIcon={<SellIcon />}>Hot Offers</Button>
      </Stack>
      <Stack spacing={2} direction='column' sx={stackStyle}>
        <Button variant="text" sx={buttonStyle} startIcon={<BrushIcon />}>Appearance</Button>
        <Button variant="text" sx={buttonStyle} startIcon={<SettingsIcon />}>Settings</Button>
      </Stack>
    </aside>
  )
}
