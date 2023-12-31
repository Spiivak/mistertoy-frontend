
import Axios from 'axios'
import { utilService } from './util.service.js'
import { httpService } from './http.service.js'
import { storageService } from './async-storage.service.js'


const TOY_KEY = 'toysDB'
// setDemoData()
// for cookies
const axios = Axios.create({
    withCredentials: true
})

const BASE_URL = 'toy/'

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter,
    getDefaultSort
}


function query(filterBy = {}) {
    return httpService.get(BASE_URL, filterBy)
}

function getById(toyId) {
    return httpService.get(BASE_URL + toyId)
}

function remove(toyId) {
    return httpService.delete(BASE_URL + toyId)
}

function save(toy) {
    if (toy._id) {
        return httpService.put(BASE_URL, toy)
    } else {
        return httpService.post(BASE_URL, toy)
    }
}

function getEmptyToy() {
    return {
        name: '',
        price: '',
        labels: [],
        createdAt: new Date(),
        inStock: '',
        img: '',
        recommendedAge: '',
    }
}

function getDefaultFilter() {
    return { name: '', maxPrice: 10000, minPrice: 0, inStock: 0, labels: [], recommendedAge: []}
}

function getDefaultSort() {
    return { name: '', maxPrice: '', minPrice: '', created: '' }
}



