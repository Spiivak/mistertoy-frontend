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
import { useSelector } from 'react-redux';
import { setFilterBy } from '../../store/actions/toy.actions';
import { ToyFilter } from './ToyFilter';
export function BottomNav() {
  const [value, setValue] = useState(0);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
  const filterBy = useSelector(storeState => storeState.toyModule.filterBy)


  function toggleFilterModal() {
    setIsFilterModalOpen(!isFilterModalOpen)
  }

  function onSetFilter(filterBy) {
    setFilterBy(filterBy)
}
const isOpen = isFilterModalOpen ? 'open' : 'closed'

  return (
    <section className='bottom-nav'>
      <button className='btn-icon small-transparent'><ShoppingCartIcon /></button>
      <NavLink to='/customer/account/profile/favorite'><button className='btn-icon small-transparent'><FavoriteIcon /></button></NavLink>
      <NavLink to='/'><button className='btn-icon small-transparent home-btn'><img src={LogoPhone} alt="" /></button></NavLink>
      <button className='btn-icon small-transparent' onClick={toggleFilterModal}><SearchIcon /></button>
      <NavLink to='/customer/account/profile'><button className='btn-icon small-transparent'><AccountCircleIcon /></button></NavLink>

      {isFilterModalOpen && (
        <div className={`bottom-nav-filter-modal ${isOpen}`}>
          <ToyFilter filterBy={filterBy} onSetFilter={onSetFilter} onClose={toggleFilterModal} />
        </div>
      )}
      {/* PROFILE */}
      {/* CART */}
      {/* HOME */}
      {/* SEARCH */}
      {/* SAVED */}

    </section>
  )
}