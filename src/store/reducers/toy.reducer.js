import { toyService } from "../../services/toy.service.js"


// toy
export const SET_TOYS = 'SET_TOYS'
export const REMOVE_TOY = 'REMOVE_TOY'
export const ADD_TOY = 'ADD_TOY'
export const UPDATE_TOY = 'UPDATE_TOY'
export const TOY_UNDO = 'TOY_UNDO'

export const SET_IS_LOADING = 'SET_IS_LOADING'

export const SET_FILTER_BY = 'SET_FILTER_BY'


export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const UPDATE_CART = 'UPDATE_CART';

const initialState = {
    toys: [],
    lastToys: [],
    isLoading: false,
    filterBy: toyService.getDefaultFilter(),
    shoppingCart: [],
}

export function toyReducer(state = initialState, action = {}) {

    let toys
    let lastToys
    let updatedCart
    switch (action.type) {
        // toy
        case SET_TOYS:
            return { ...state, toys: action.toys }

        case REMOVE_TOY:
            lastToys = [...state.toys]
            toys = state.toys.filter(toy => toy._id !== action.toyId)
            return { ...state, toys, lastToys }

        case ADD_TOY:
            toys = [...state.toys, action.toy]
            return { ...state, toys }

        case UPDATE_TOY:
            toys = state.toys.map(toy => toy._id === action.toy._id ? action.toy : toy)
            return { ...state, toys }


        case SET_IS_LOADING:
            return { ...state, isLoading: action.isLoading }

        case SET_FILTER_BY:
            return { ...state, filterBy: { ...state.filterBy, ...action.filterBy } }


        case ADD_TO_CART:
            updatedCart = [...state.shoppingCart, action.toyId];
            return { ...state, shoppingCart: updatedCart };

        case REMOVE_FROM_CART:
            const newCart = state.shoppingCart.filter(id => id !== action.toyId);
            return { ...state, shoppingCart: newCart };
        case UPDATE_CART:
            const { toyId, quantity } = action;
             updatedCart = state.shoppingCart.map(id => {
                if (id === toyId) {
                    return { id, quantity };
                }
                return id;
            });
            return { ...state, shoppingCart: updatedCart };
        case TOY_UNDO:
            toys = [...state.lastToys]
            return { ...state, toys }

        default:
            return state
    }
}
