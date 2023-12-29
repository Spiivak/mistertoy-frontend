// const { useState, useEffect } = React
// const { useSelector, useDispatch } = ReactRedux

import { useDispatch, useSelector } from 'react-redux'
// import { ToyFilter } from '../cmps/ToyFilter.jsx'
import { ToyList } from '../../cmps/ToyList.jsx'
import { toyService } from '../../services/toy.service.js'
import { showSuccessMsg, showErrorMsg } from '../../services/event-bus.service.js'
import { loadToys, removeToy, removeToyOptimistic, saveToy, setFilterBy } from '../../store/actions/toy.actions.js'
// import { ADD_CAR_TO_CART } from '../store/reducers/toy.reducer.js'
import { useEffect } from 'react'
import { ToyFilter } from '../../cmps/ToyFilter.jsx'

export function ToyIndex() {
    const toys = useSelector(storeState => storeState.toyModule.toys)
    const isLoading = useSelector(storeState => storeState.toyModule.isLoading)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)

    useEffect(() => {
        loadToys()
            .catch(() => {
                showErrorMsg('Cannot show toys')
            })
    }, [filterBy])

    async function onRemoveToy(toyId) {
        try {
            await removeToyOptimistic(toyId)
            showSuccessMsg('Toy removed')
        } catch (err) {
            console.log('Cannot remove toy', err)
            showErrorMsg('Cannot remove toy')
        }
    }



    async function onEditToy(toy) {
        const price = +prompt('New price?')
        const toyToSave = { ...toy, price }

        try {
            const savedToy = await saveToy(toyToSave)
            showSuccessMsg(`Toy updated to price: $${savedToy.price}`)
        } catch (err) {
            console.log('Cannot update toy', err)
            showErrorMsg('Cannot update toy')

        }
    }

    function onSetFilter(filterBy) {
        console.log('filterBy:', filterBy)
        setFilterBy(filterBy)
    }

    return (
        <section className='toy-index'>
            <main>
                <ToyFilter filterBy={filterBy} onSetFilter={onSetFilter} />
                {!isLoading && <ToyList
                    toys={toys}
                    onEditToy={onEditToy}
                    onRemoveToy={onRemoveToy}
                />}
                {isLoading && <div>Loading...</div>}
            </main>
        </section>
    )

}