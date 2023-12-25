import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import './assets/style/main.css'
// const Router = ReactRouterDOM.BrowserRouter
// const { Route, Routes } = ReactRouterDOM
// const { Provider } = ReactRedux

// import { AppHeader } from './cmps/AppHeader'
// import { AppFooter } from './cmps/AppFooter'

// import { HomePage } from './pages/HomePage'
// import { AboutUs } from './pages/AboutUs'
// import { CarIndex } from './pages/CarIndex.jsx'
import { store } from './store/store.js'
// import { CarDetails } from './pages/CarDetails.jsx'


export function App() {

    return (
        <Provider store={store}>
            <Router>
                <h1>Hello World</h1>
                {/* <section className="main-layout app">
                    <AppHeader />
                    <main>
                        <Routes>
                            <Route element={<HomePage />} path="/" />
                            <Route element={<AboutUs />} path="/about" />
                            <Route element={<CarDetails />} path="/car/:carId" />
                            <Route element={<CarIndex />} path="/car" />
                        </Routes>
                    </main>
                    <AppFooter />
                </section> */}
            </Router>
        </Provider>
    )
}


