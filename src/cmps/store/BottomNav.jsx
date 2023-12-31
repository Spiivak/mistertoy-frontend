import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useState } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoPhone from '../../assets/img/logo-phone.png';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import { NavLink } from 'react-router-dom';
export function BottomNav() {
  const [value, setValue] = useState(0);

  return (
    <section className='bottom-nav'>
      <button className='btn-icon small-transparent'><ShoppingCartIcon /></button>
      <NavLink to='/customer/account/profile/favorite'><button className='btn-icon small-transparent'><FavoriteIcon /></button></NavLink>
      <NavLink to='/'><button className='btn-icon small-transparent home-btn'><img src={LogoPhone} alt="" /></button></NavLink>
      <button className='btn-icon small-transparent'><SearchIcon /></button>
      <NavLink to='/customer/account/profile'><button className='btn-icon small-transparent'><AccountCircleIcon /></button></NavLink>


      {/* PROFILE */}
      {/* CART */}
      {/* HOME */}
      {/* SEARCH */}
      {/* SAVED */}

    </section>
    // <Box sx={{ width: 500 }}>
    //   <BottomNavigation
    //     showLabels
    //     value={value}
    //     onChange={(event, newValue) => {
    //       setValue(newValue);
    //     }}
    //   >
    //     <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
    //     <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
    //     <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
    //   </BottomNavigation>
    // </Box>
  );
}