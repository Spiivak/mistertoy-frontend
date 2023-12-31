import { toyService } from "../../services/toy.service.js"
import { ADD_TOY, TOY_UNDO, REMOVE_TOY, SET_TOYS, SET_FILTER_BY, SET_IS_LOADING, UPDATE_TOY } from "../reducers/toy.reducer.js"
import { store } from "../store.js"

export async function loadToys() {
    try {
        store.dispatch({ type: SET_IS_LOADING, isLoading: true });
        const filterBy = store.getState().toyModule.filterBy;

        const toys = await toyService.query(filterBy);

        store.dispatch({ type: SET_TOYS, toys })
    } catch (err) {
        console.error('Failed to load toys:', err);
        throw err;
    } finally {
        store.dispatch({ type: SET_IS_LOADING, isLoading: false });
    }
}

export async function removeToyOptimistic(toyId) {

    try {
        store.dispatch({ type: REMOVE_TOY, toyId })
        store.dispatch({ type: SET_IS_LOADING, isLoading: true })

        const toy = await toyService.remove(toyId)
        store.dispatch({ type: TOY_UNDO })
    } catch (err) {
        console.error('Failed to remove toy optimistically:', err);
        if (err instanceof NetworkError) {
            console.error('Network error during toy removal.');
        } else {
            console.error('Unexpected error during toy removal:', err);
        }
        throw err
    } finally {
        store.dispatch({ type: SET_IS_LOADING, isLoading: false })
    }
}


export async function removeToy(toyId) {

    try {
        store.dispatch({ type: SET_IS_LOADING, isLoading: true })
        const toy = toyService.remove(toyId)
        store.dispatch({ type: REMOVE_TOY, toyId })
        // store.dispatch({ type: TOY_UNDO });
        console.log('Successfully removed toy:', toyId)
        await toyService.remove(toyId)
    } catch (err) {
        console.error('Failed to remove toy:', err);
        if (err instanceof NetworkError) {
            console.error('Network error during toy removal.');
        } else {
            console.error('Unexpected error during toy removal:', err);
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