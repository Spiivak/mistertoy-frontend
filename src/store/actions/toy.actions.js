import { toyService } from "../../services/toy.service.js"
import { ADD_TOY, TOY_UNDO, REMOVE_TOY, SET_TOYS, SET_FILTER_BY, SET_IS_LOADING, UPDATE_TOY, ADD_TO_CART, REMOVE_FROM_CART, UPDATE_CART } from "../reducers/toy.reducer.js"
import { store } from "../store.js"

export async function loadToys() {
    try {
        store.dispatch({ type: SET_IS_LOADING, isLoading: true })
        const filterBy = store.getState().toyModule.filterBy

        const toys = await toyService.query(filterBy)

        store.dispatch({ type: SET_TOYS, toys })
    } catch (err) {
        console.error('Failed to load toys:', err)
        throw err
    } finally {
        store.dispatch({ type: SET_IS_LOADING, isLoading: false })
    }
}

export async function removeToyOptimistic(toyId) {

    try {
        store.dispatch({ type: REMOVE_TOY, toyId })
        store.dispatch({ type: SET_IS_LOADING, isLoading: true })

        const toy = await toyService.remove(toyId)
        store.dispatch({ type: TOY_UNDO })
    } catch (err) {
        console.error('Failed to remove toy optimistically:', err)
        if (err instanceof NetworkError) {
            console.error('Network error during toy removal.')
        } else {
            console.error('Unexpected error during toy removal:', err)
        }
        throw err
    } finally {
        store.dispatch({ type: SET_IS_LOADING, isLoading: false })
    }
}


export async function removeToy(toyId) {

    try {
        store.dispatch({ type: SET_IS_LOADING, isLoading: true })
        const toy = await toyService.remove(toyId)
        store.dispatch({ type: REMOVE_TOY, toyId })
        // store.dispatch({ type: TOY_UNDO })
        console.log('Successfully removed toy:', toyId)
        await toyService.remove(toyId)
    } catch (err) {
        console.error('Failed to remove toy:', err)
        if (err instanceof NetworkError) {
            console.error('Network error during toy removal.')
        } else {
            console.error('Unexpected error during toy removal:', err)
        }
        throw err
    } finally {
        store.dispatch({ type: SET_IS_LOADING, isLoading: false })
    }
    
}

export async function saveToy(toy) {
    const type = toy._id ? UPDATE_TOY : ADD_TOY
    try {
        const toyToSave = await toyService.save(toy)
        store.dispatch({ type, toy: toyToSave })
        return toyToSave
    } catch (err) {
        console.log('toy action -> Cannot save toy', err)
        throw err
    }
}

export function setFilterBy(filterBy) {
    store.dispatch({ type: SET_FILTER_BY, filterBy })
}


// SHOPPING CART

export function addToCart(toyId) {
    console.log('addToCart  toyId:', toyId)
    try {
        // store.dispatch({ type: SET_IS_LOADING, isLoading: true })
        store.dispatch({ type: ADD_TO_CART, toyId })
    } catch (error) {
        console.error('Cannot Add to cart', error)
    }
}
export function removeFromCart(toyId) {
    
    try {
        store.dispatch({ type: SET_IS_LOADING, isLoading: true })
        store.dispatch({ type: REMOVE_FROM_CART, toyId })

    } catch (error) {
        console.error('Cannot Remove from cart', error)
    }
}

export function updateCart(toyId, quantity) {
    
    try {
        store.dispatch({ type: SET_IS_LOADING, isLoading: true })
        store.dispatch({ type: UPDATE_CART, toyId, quantity })

    } catch (error) {
        console.error('Cannot update cart', error)
    }
}