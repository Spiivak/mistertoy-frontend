import { Route, Routes, BrowserRouter as Router, useLocation } from 'react-router-dom'
import { Provider } from 'react-redux'
import './assets/style/main.scss'

import { AppHeader } from './cmps/AppHeader'
import { store } from './store/store.js'
import { ToyIndex } from './pages/ToyIndex.jsx'
import { ToyDetails } from './pages/ToyDetails.jsx'
import { AdminHeader } from './cmps/admin/AdminHeader.jsx'
import {AdminIndex} from './pages/AdminIndex.jsx'
import {AdminDash} from './pages/AdminDash.jsx'
import { AdminProducts } from './pages/AdminProducts.jsx'


export function App() {
    // const navigate = useNavigate();
    // console.log('App  navigate:', navigate)
    // const location = useLocation()

    return (
        <Provider store={store}>
            <Router>
                <>
                    <AppHeader />
                    {/* {!location.pathname.includes('/admin') && <AppHeader />} */}
                        <Routes>
                            {/* <Route element={<HomePage />} path="/" /> */}
                            {/* <Route element={<AboutUs />} path="/about" /> */}
                            <Route element={<ToyDetails />} path="/toy/:toyId" />
                            <Route element={<ToyIndex />} path="/toy" />
                            <Route element={<AdminIndex />} path="/admin">
                                <Route element={<AdminDash />} path="/admin/dashboard" />
                                <Route element={<AdminProducts />} path="/admin/products" />
                            </Route>
                        </Routes>
                    {/* <AppFooter /> */}
                </>
            </Router>
        </Provider>
    )
}


