
import Axios from 'axios'
import { utilService } from './util.service.js'
import { httpService } from './http.service.js'
import { storageService } from './async-storage.service.js'


const TOY_KEY = 'toysDB'
// setDemoData()
// for cookies
// const axios = Axios.create({
//     withCredentials: true
// })

// const BASE_URL = '/api/toy'

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
    console.log('query  filterBy:', filterBy)
    // if (!filterBy.name) filterBy.name = ''
    return storageService.query(TOY_KEY)
    .then(toys => {
        if(filterBy.name) {
            const regExp = new RegExp(filterBy.name, 'i')
            toys = toys.filter(toy => regExp.test(toy.name))
        }
        if (filterBy.maxPrice !== null) {
            toys = toys.filter(toy => toy.price >= filterBy.maxPrice);
        }
        
        if (filterBy.minPrice !== null) {
            toys = toys.filter(toy => toy.price <= filterBy.minPrice);
        }

        if(filterBy.inStock !== "all") {
            toys = toys.filter(toy => toy.inStock === JSON.parse(filterBy.inStock))
        }

        return toys
        })

}

function getById(toyId) {
    return storageService.get(TOY_KEY, toyId)
}

function remove(toyId) {
    return storageService.remove(TOY_KEY, toyId)
}

function save(toy) {
    if (toy._id) {
        return storageService.put(TOY_KEY, toy)
    } else {
        return storageService.post(TOY_KEY, toy)
    }
}


function getEmptyToy() {
    return {
        name: utilService.makeLorem(5),
        price: utilService.getRandomIntInclusive(15, 1500),
        labels: ['label1', 'label2', 'label3'],
        createdAt: new Date(),
        inStock: Math.random() < 0.5,
    }
}

// function setDemoData() {
//   if (!toys && !toys.length) {

//     const toys = [
//       getEmptyToy(),
//       getEmptyToy(),
//       getEmptyToy()
//     ]
//     utilService.saveToStorage(TOY_KEY, toys)
//   }
// }


function getDefaultFilter() {
    return { name: '', maxPrice: null, minPrice: null, inStock: 'all', label: '' }
}

function getDefaultSort() {
    return { name: '', maxPrice: '', minPrice: '', created: '' }
}



