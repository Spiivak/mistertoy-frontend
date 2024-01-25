import { httpService } from './http.service.js'

const BASE_URL = 'auth/'
const STORAGE_KEY_LOGGEDIN = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
    getById,
    getLoggedinUser,
    updateScore,
    getEmptyCredentials
}

async function getById(userId) {
    try {
        const user = await httpService.get(BASE_URL + userId)
        return user
    } catch (err) {
        console.error('Cannot find user with this id' ,err)
        throw err
    }
}

async function login({ email, password }) {
    try {
        const loginUser = await httpService.post(BASE_URL + 'login', { email, password })
        return _setLoggedinUser(loginUser)
    }  catch (err) {
        console.error('Cannot login user', err)
        throw err
    }
}

async function signup({ email, password, fullname, phone, acceptSMS }) {
    const user = { email, password, fullname, score: 10000, phone, acceptSMS }
    try {
        await httpService.post(BASE_URL + 'signup', user)
        return _setLoggedinUser(user)
    } catch (err) {
        console.error('Invalid signup', err)
        throw err
    }
}



async function updateScore(diff) {
    if (getLoggedinUser().score + diff < 0) return Promise.reject('No credit')
    try {
        const user = await httpService.put('user/', { diff })
        _setLoggedinUser(user)
    } catch (err) {
        console.error('Error updating score:', err)
        throw err
    }
}

async function logout() {
    try {
        await httpService.post(BASE_URL + 'logout')
        sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
    } catch (err) {
        console.error('Error logging out:', err)
        throw err
    }
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

function _setLoggedinUser(user) {
    const userToSave = { _id: user._id, email: user.email, fullname: user.fullname, score: user.score, isAdmin: user.isAdmin}
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(userToSave))
    return userToSave
}


function getEmptyCredentials() {
    return {
        email: '',
        password: '',
        score: 0,
        fullname: '',
        acceptSMS: '',
        phone: '',
        isAdmin: false,
        img: '',
    }
}


// Test Data
// userService.signup({username: 'muki', password: 'muki1', fullname: 'Muki Ja'})
// userService.login({username: 'muki', password: 'muki1'})



