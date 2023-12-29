import { Route, Routes, BrowserRouter as Router, useLocation } from 'react-router-dom'
import { Provider } from 'react-redux'
import './assets/style/main.scss'

import { AppHeader } from './cmps/AppHeader'
import { store } from './store/store.js'
import { ToyIndex } from './pages/StorePages/ToyIndex.jsx'
import { ToyDetails } from './pages/StorePages/ToyDetails.jsx'
import { AdminHeader } from './cmps/admin/AdminHeader.jsx'
import {AdminIndex} from './pages/AdminIndex.jsx'
import {AdminDash} from './pages/AdminDash.jsx'
import { AdminProducts } from './pages/AdminProducts.jsx'
import { CustomerCreate } from './cmps/customer/CustomerCreate.jsx'
import { CustomerLogin } from './cmps/customer/CustomerLogin.jsx'
import { HomePage } from './pages/StorePages/HomePage.jsx'
import { AboutPage } from './pages/StorePages/AboutPage.jsx'


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
                            <Route element={<HomePage />} path="/" />
                            <Route element={<AboutPage />} path="/about-us" />
                            <Route element={<ToyDetails />} path="/catalog/:toyId" />
                            <Route element={<ToyIndex />} path="/catalog" />
                            <Route element={<CustomerCreate/>} path='/customer/account/create'></Route>
                            <Route element={<CustomerLogin/>} path='/customer/account/login'></Route>
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


