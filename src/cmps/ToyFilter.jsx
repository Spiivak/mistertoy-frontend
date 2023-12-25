// const { useState, useEffect, useRef } = React

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
        const field = target.name;
        let value = target.value;

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || '';
                break;

            case 'checkbox':
                value = target.checked;
                break;

            default:
                break;
        }
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }));
    }



    return (
        <section className="toy-filter full main-layout">
            <h2>Toys Filter</h2>
            <form >
                <input type="text"
                    id="name"
                    name="name"
                    placeholder="By Name"
                    value={filterByToEdit.name || ''}
                    onChange={handleChange}
                />

                <input type="number"
                    id="maxPrice"
                    name="maxPrice"
                    placeholder="By max price"
                    value={filterByToEdit.maxPrice || ''}
                    onChange={handleChange}
                />

                <label htmlFor="inStock">In Stock:</label>
                <select
                    id="inStock"
                    name="inStock"
                    value={filterByToEdit.inStock || ''}
                    onChange={handleChange}
                >
                    <option value="all">All</option>
                    <option value={true}>In Stock</option>
                    <option value={false}>Not In Stock</option>
                </select>

            </form>

        </section>
    )
}