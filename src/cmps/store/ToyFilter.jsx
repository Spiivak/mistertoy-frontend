// const { useState, useEffect, useRef } = React
import * as React from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormHelperText from '@mui/material/FormHelperText'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useRef, useState } from "react"
import { utilService } from "../../services/util.service.js"
import { Accordion, AccordionDetails, AccordionSummary, Checkbox, FormControlLabel, Slider, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useSelector } from 'react-redux'
import { useEffectUpdate } from '../../customHooks/useEffectUpdate.js'


export function ToyFilter({ filterBy, onSetFilter, onClose }) {

    const toys = useSelector(storeState => storeState.toyModule.toys)

    const [categoryAccordionExpanded, setCategoryAccordionExpanded] = useState(false)
    const [vendorAccordionExpanded, setVendorAccordionExpanded] = useState(false)
    const [ageAccordionExpanded, setAgeAccordionExpanded] = useState(false)
    const [priceAccordionExpanded, setPriceAccordionExpanded] = useState(false)

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    onSetFilter = useRef(utilService.debounce(onSetFilter))

    useEffectUpdate(() => {
        onSetFilter.current(filterByToEdit)
        console.log('useEffect  filterByToEdit:', filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break;

            case 'checkbox':
                value = target.checked
                break;

            default:
                break;
        }
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }


    const handleAccordionChange = (accordion) => {
        switch (accordion) {
            case 'category':
                setCategoryAccordionExpanded((prevExpanded) => !prevExpanded)
                break;

            case 'vendor':
                setVendorAccordionExpanded((prevExpanded) => !prevExpanded)
                break;

            case 'age':
                setAgeAccordionExpanded((prevExpanded) => !prevExpanded)
                break;
            case 'price':
                setPriceAccordionExpanded((prevExpanded) => !prevExpanded)
                break;

            default:
                break;
        }
    }

    const uniqueAges = [
        "2", "3", "4", "0 - 6 Months", "6 - 24 Months", "2 - 4 Years", "4 - 6 Years", "6 - 8 Years", "8+"
    ]
    const uniqueLabels = ["Building", "Creativity", "Doll", "Imagination", "Board Game", "Strategy", "Outdoor", "Action", "Sci-Fi", "Puzzle", "Brain Teaser", "Car", "Disney", "Card Game", "Tech", "Luck", "Nature", "Drawing", "Cars"];


    const handleLabelChange = (label) => (event) => {
        // Handle label selection logic here
        const isChecked = event.target.checked;
    
        setFilterByToEdit((prevFilter) => {
            if (isChecked) {
                // Add the label to the array
                return { ...prevFilter, labels: [...prevFilter.labels, label] };
            } else {
                // Remove the label from the array
                return { ...prevFilter, labels: prevFilter.labels.filter((selectedLabel) => selectedLabel !== label) };
            }
        });
    };

    const handleSliderChange = (event, newValue) => {
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, minPrice: newValue[0], maxPrice: newValue[1] }));
    };



    return (
        <>
            <section className="toy-filter">
                <button className='btn-icon small-transparent btn-close' onClick={() => onClose()}><CloseIcon /></button>
                {/* <h2>Toys Filter</h2> */}
                <form className='toy-filter-form flex column'>
                    {/* FILTER BY CATEGORY */}
                    <Accordion expanded={categoryAccordionExpanded} onChange={() => handleAccordionChange('category')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="filter-content"
                            id="filter-header"
                        >
                            <Typography>Categories</Typography>
                        </AccordionSummary>
                        <AccordionDetails style={{ maxHeight: '200px', overflowY: 'auto' }}>
                                    {uniqueLabels.map((label, labelIndex) => (
                                <div key={labelIndex}>
                                        <FormControlLabel
                                            control={<Checkbox />}
                                            label={label}
                                            onChange={handleLabelChange(label)}
                                        />
                                </div>
                                    ))}
                        </AccordionDetails>
                    </Accordion>
                    {/* FILTER BY AGE */}
                    <Accordion expanded={ageAccordionExpanded} onChange={() => handleAccordionChange('age')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="filter-content"
                            id="filter-header"
                        >
                            <Typography>Ages</Typography>
                        </AccordionSummary>
                        <AccordionDetails style={{ maxHeight: '200px', overflowY: 'auto' }}>
                            {uniqueAges.map((age, index) => (
                                <div key={index}>
                                    {/* Your label (category) filter options */}
                                    <FormControlLabel
                                        control={<Checkbox />}
                                        label={age}
                                        onChange={handleLabelChange(age)}
                                    />

                                </div>
                            ))}
                        </AccordionDetails>
                    </Accordion>

                    {/* FILTER BY VENDOR */}
                    <Accordion expanded={vendorAccordionExpanded} onChange={() => handleAccordionChange('vendor')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="filter-content"
                            id="filter-header"
                        >
                            <Typography>Vendor</Typography>
                        </AccordionSummary>
                        <AccordionDetails style={{ maxHeight: '200px', overflowY: 'auto' }}>
                            {uniqueLabels.map((label, index) => (
                                <div key={index}>
                                        <FormControlLabel
                                            key={index}
                                            control={<Checkbox />}
                                            label={label}
                                            onChange={handleLabelChange(label)}
                                        />
                                </div>
                            ))}
                        </AccordionDetails>
                    </Accordion>




                    <Accordion expanded={priceAccordionExpanded} onChange={() => handleAccordionChange('price')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="filter-content"
                            id="filter-header"
                        >
                            <Typography>Price</Typography>
                        </AccordionSummary>
                        <AccordionDetails style={{ maxHeight: '200px' }}>
                        <Slider
                        value={[filterByToEdit.minPrice, filterByToEdit.maxPrice]} // Set initial values or default values
                        onChange={handleSliderChange}
                        valueLabelDisplay="auto"
                        aria-labelledby="price-slider-label"
                        min={0}
                        max={999}
                    />
                        </AccordionDetails>
                    </Accordion>

                    {/* <TextField
                        id="outlined-search"
                        name="name"
                        label="Search..."
                        type="search"
                        value={filterByToEdit.name ?? ''}
                        variant="outlined"
                        onChange={handleChange}
                    />
                    <TextField
                        id="outlined-search"
                        name="maxPrice"
                        label="Number"
                        type="number"
                        value={filterByToEdit.maxPrice ?? ''}
                        variant="outlined"
                        onChange={handleChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <FormControl sx={{ m: 0, minWidth: 120 }}>
                        <InputLabel id="inStockLabel">In Stock</InputLabel>
                        <Select
                            labelId="inStockLabel"
                            id="inStock"
                            name="inStock"
                            value={filterByToEdit.inStock ?? 'all'}
                            label="In Stock"
                            onChange={handleChange}
                        >
                            <MenuItem value={"all"}>All</MenuItem>
                            <MenuItem value={true}>In Stock</MenuItem>
                            <MenuItem value={false}>Out of stock</MenuItem>
                        </Select>
                    </FormControl> */}
                </form>

            </section>
        </>
    )
}