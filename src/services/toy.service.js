
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
    getDefaultFilter
}

function query() {
  return storageService.query(TOY_KEY)

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
        inStock: true,
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
    return { txt: '', maxPrice: '' }
}



