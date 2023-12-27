import React, { useState } from 'react'
import { IconButton, Menu, MenuItem, Radio, FormControlLabel, Paper } from '@mui/material'
import SwapVertIcon from '@mui/icons-material/SwapVert'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'

// Component for radio menu item
const RadioMenuItem = ({ label, selected, onClick }) => (
  <MenuItem onClick={onClick}>
    <FormControlLabel
      control={<Radio checked={selected} />}
      label={label}
    />
  </MenuItem>
)

// Component for arrow menu item
const ArrowMenuItem = ({ label, sortOrder, onClick }) => (
  <MenuItem onClick={onClick}>
    {label}
    {label === 'A-Z' && <ArrowUpwardIcon />}
    {label === 'Z-A' && <ArrowDownwardIcon />}
  </MenuItem>
)

export function SortButton() {
  const [anchorEl, setAnchorEl] = useState(null)
  const [sortOrder, setSortOrder] = useState('az')

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  const handleSortBy = (sortBy) => {
    // Handle sorting logic based on the selected option
    console.log('Sorting by:', sortBy)

    // Toggle sort order for A-Z and Z-A
    if (sortBy === 'az' || sortBy === 'za') {
      setSortOrder(sortOrder === 'az' ? 'za' : 'az')
    }

    // Close the menu after selecting an option
    handleCloseMenu()
  }

  return (
    <>
      <IconButton
        aria-label="align"
        onClick={handleOpenMenu}
      >
        <SwapVertIcon />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <RadioMenuItem
          label="Product Name"
          selected={sortOrder === 'productName'}
          onClick={() => handleSortBy('productName')}
        />
        <RadioMenuItem
          label="Created"
          selected={sortOrder === 'created'}
          onClick={() => handleSortBy('created')}
        />
        <RadioMenuItem
          label="Updated"
          selected={sortOrder === 'updated'}
          onClick={() => handleSortBy('updated')}
        />
        <RadioMenuItem
          label="Inventory"
          selected={sortOrder === 'inventory'}
          onClick={() => handleSortBy('inventory')}
        />
        <RadioMenuItem
          label="Product Type"
          selected={sortOrder === 'productType'}
          onClick={() => handleSortBy('productType')}
        />
        <RadioMenuItem
          label="Vendor"
          selected={sortOrder === 'vendor'}
          onClick={() => handleSortBy('vendor')}
        />

        <ArrowMenuItem
          label={`A-Z`}
          sortOrder={sortOrder}
          onClick={() => handleSortBy('az')}
        />
        <ArrowMenuItem
          label="Z-A"
          sortOrder={sortOrder}
          onClick={() => handleSortBy('za')}
        />
      </Menu>
    </>
  )
}
