import Button from '@mui/material/Button'
import { Dialog, IconButton, MenuItem, Select, Stack, Tooltip } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import UploadIcon from '@mui/icons-material/Upload';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useEffect, useState } from 'react';
import { AddForm } from '../cmps/admin/AddForm';
import { toyService } from '../services/toy.service';
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service';
import { loadToys, saveToy } from '../store/actions/toy.actions';
import { useSelector } from 'react-redux';
import { ToyTable } from '../cmps/admin/ToyTable';
import { SortButton } from '../cmps/admin/SortyBy';

export function AdminProducts() {
  const toys = useSelector(storeState => storeState.toyModule.toys)
  const checkToys = Object.keys(toys).length === 0
  console.log('AdminProducts  toys:', toys)

  const [selectedAction, setSelectedAction] = useState(null)
  const [open, setOpen] = useState(false)
  const [isFormOpen, setFormOpen] = useState(false)

  useEffect(() => {
    async () => {
      try {
        const toys = await loadToys()
        console.log('toys:', toys)
        return toys
      } catch (err) {
        showErrorMsg('Cannot show toys')

      }
    }

    (ev) => {
      ev.preventDefault()
    }
    // loadToys()
    //   .catch(() => {
    //     showErrorMsg('Cannot show toys')
    //   })
  }, [])

  const handleAddButtonClick = () => {
    setFormOpen(true)
  }

  async function onAddToy(toy) {
    // const toyToSave = toyService.getEmptyToy()
    if (toy.img === '') toy.img = `https://robohash.org/${toy.name}`

    try {
      const savedTtoy = await saveToy(toy)
      console.log('savedToy:', savedTtoy)
      setFormOpen(false);
      showSuccessMsg(`Toy added (name: ${savedTtoy.name})`)
    } catch (err) {
      console.log('Cannot add toy', err)
      showErrorMsg('Cannot add toy')
    }
  }
  const handleModalClose = () => {
    setFormOpen(false);
  };


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAction = (action) => {
    setSelectedAction(action);
    handleClose();
  };
  // if (!toys || Object.keys(toys).length === 0) return <div>Loading...</div>
  return (
    <section className="admin-products">
      <div className="title-actions flex space-between align-center">
        <h1>Products</h1>
        <div>

          <Select
            open={open}
            onOpen={handleOpen}
            onClose={handleClose}
            displayEmpty
            renderValue={() => (selectedAction ? selectedAction : 'More Actions')}
            sx={{ height: '35px', margin: '0px' }}
          >
            <MenuItem disabled value="">
              More Actions
            </MenuItem>
            {!selectedAction || selectedAction === 'Hide' ? (
              <MenuItem onClick={() => handleAction('Show')}>
                <IconButton size="small">
                  <VisibilityIcon />
                </IconButton>
                Show analytics bar
              </MenuItem>
            ) : null}
            {!selectedAction || selectedAction === 'Show' ? (
              <MenuItem onClick={() => handleAction('Hide')}>
                <IconButton size="small">
                  <VisibilityOffIcon />
                </IconButton>
                Hide analystics bar
              </MenuItem>
            ) : null}
          </Select>

          {!checkToys && <Button variant="contained" startIcon={<AddIcon />} onClick={handleAddButtonClick}>
            Add Product
          </Button>}
        </div>
      </div>

      <div className="analystics-bar flex">
        <div className="products-by-sell">
          <p>Products by sell-through rate</p>
          <p>0% <span>-</span></p>
        </div>

        <div className="prodcuts-by-day">
          <p>Products by days of inventory remaining</p>
          <p>There was no data found for this data range</p>
        </div>

        <div className="ABC-product">
          <p>ABC prdocuts analysis</p>
          <p>There was data found for this data range</p>
        </div>
      </div>


      {/* If no produts to display */}
      <section className="add-products">
        <div className="add-products-actions flex space-between">
          <div className="right-actions">

            <Tooltip title="All" arrow>
              <Button variant="text" size='small' disabled={checkToys}>All</Button>
            </Tooltip>
            {!checkToys &&
              <>
                <Tooltip title="Active" arrow>
                  <Button variant="text" size='small'>Active</Button>
                </Tooltip>
                <Tooltip title="Archived" arrow>
                  <Button variant="text" size='small'>Archived</Button>
                </Tooltip>
                <Tooltip title="Draft" arrow>
                  <Button variant="text" size='small'>Draft</Button>
                </Tooltip>
              </>
            }
                        <Tooltip title="Create View" arrow> 
            <IconButton aria-label="add" disabled={checkToys}><AddIcon /></IconButton>
                        </Tooltip>
          </div>
          <div className="left-actions">
            <IconButton aria-label="search" disabled={checkToys}><SearchIcon /></IconButton>
            <IconButton aria-label="align" disabled={checkToys}><FilterListIcon /></IconButton>
            <IconButton aria-label="align" disabled={checkToys}><FilterListIcon /></IconButton>
            {!checkToys && <SortButton />}
          </div>
        </div>
        {checkToys && <div className="add-your-products">
          <h3>Add your products</h3>
          <p>Start by stocking your store with products your customers will love</p>
          <div className="add-your-products-actions flex">
            <Button variant="contained" startIcon={<AddIcon />} onClick={handleAddButtonClick}>
              Add Product
            </Button>
            <Button variant="outlined" startIcon={<UploadIcon />}>Import</Button>
          </div>
        </div>}
        <Dialog open={isFormOpen} onClose={handleModalClose}>
          <AddForm onAddToy={onAddToy} />
        </Dialog>
        {!checkToys && <ToyTable toys={toys} />}

      </section>
    </section>
  )
}
