import { useSelector } from 'react-redux'
import { ToyList } from '../../cmps/store/ToyList.jsx'
import { showSuccessMsg, showErrorMsg } from '../../services/event-bus.service.js'
import { loadToys, removeToy, removeToyOptimistic, saveToy, setFilterBy } from '../../store/actions/toy.actions.js'
import { useEffect, useState } from 'react'
import { ToyFilter } from '../../cmps/store/ToyFilter.jsx'

export function ToyIndex() {
    const toys = useSelector(storeState => storeState.toyModule.toys)
    const isLoading = useSelector(storeState => storeState.toyModule.isLoading)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)

    useEffect(() => {
        onLoadToys()
    }, [filterBy])
    async function onLoadToys() {
        try {
            await loadToys()
        } catch (error) {
            console.error(error)
        }
    }
    async function onRemoveToy(toyId) {
        try {
            await removeToyOptimistic(toyId)
            showSuccessMsg('Toy removed')
        } catch (err) {
            console.log('Cannot remove toy', err)
            showErrorMsg('Cannot remove toy')
        }
    }

    function toggleFilterModal() {
        setIsFilterModalOpen(!isFilterModalOpen)
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
        setFilterBy(filterBy)
    }
    const isOpen = isFilterModalOpen ? 'open' : 'closed'
    return (
        <section className='toy-index'>
                <button className="filter-button" onClick={toggleFilterModal}>
                    Filter
                </button>
            <div className="information flex space-between align-center">
                <h2>Filter</h2>
                <span>Displaying 1-100 products out of 4351</span>
            </div>
            <main>
                <div className="toy-desk-filter">
                <ToyFilter filterBy={filterBy} onSetFilter={onSetFilter} />
                </div>
                {!isLoading && <ToyList
                    toys={toys}
                    onEditToy={onEditToy}
                    onRemoveToy={onRemoveToy}
                />}
                {isLoading && <div>Loading...</div>}
                {isFilterModalOpen && (
                    <div className={`filter-modal ${isOpen}`}>
                    <ToyFilter filterBy={filterBy} onSetFilter={onSetFilter} onClose={toggleFilterModal} />
                    </div>
                )}
            </main>
        </section>
    )

}