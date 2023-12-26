// const { useState, useEffect, useRef } = React
import * as React from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormHelperText from '@mui/material/FormHelperText'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'

import { useEffect, useRef, useState } from "react"
import { utilService } from "../services/util.service.js"


export function ToyFilter({ filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    onSetFilter = useRef(utilService.debounce(onSetFilter))

    useEffect(() => {
        onSetFilter.current(filterByToEdit)
        console.log('useEffect  filterByToEdit:', filterByToEdit)
    }, [filterByToEdit])

    // function handleChange({ target }) {
    //     let { value, name: field, type } = target
    //     value = type === 'number' ? +value : value
    //     setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    // }

    function handleChange({ target }) {
        console.log('handleChange  target:', target)
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
        console.log('filterByToEdit:', filterByToEdit)

    }



    return (
        <section className="toy-filter">
            <h2>Toys Filter</h2>
            <form className='flex align-center'>
                <TextField
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
                </FormControl>
            </form>

        </section>
    )
}