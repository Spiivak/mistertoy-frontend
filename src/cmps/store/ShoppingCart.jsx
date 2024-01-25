import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { toyService } from '../../services/toy.service'
// import { getById } from '../../services/toyService'

export function ShoppingCart() {
    const cart = useSelector(storeState => storeState.toyModule.shoppingCart)

    const [cartItems, setCartItems] = useState([])

    useEffect(() => {
        // Function to fetch details for each toy in the cart
        const fetchCartItemsDetails = async () => {
            try {
                const itemsDetails = await Promise.all(cart.map(toyId => toyService.getById(toyId)))
                setCartItems(itemsDetails)
            } catch (error) {
                console.error('Error fetching cart items:', error)
            }
        }

        // Call the fetch function
        fetchCartItemsDetails()
    }, [cart])

    if (!cart) return <div>Loading...</div>
    return (
        <section className='shopping-cart'>
            <h1>Shopping Cart</h1>
            <ul className='flex column gap16'>
                {cartItems.map(item => {
                {console.log('ShoppingCart  item:', item)}
                   return <li key={item._id} className='flex align-center gap8'>
                        
                        <img src={item.img} className='item-image' alt="" />
                        <div className="flex column">
                        <p className='item-name'>{item.name}</p>
                        <p className='item-price'>Price: ${item.price.toLocaleString()}</p>
                        </div>
                        {/* Add other details you want to display */}
                    </li>
                })}
            </ul>
        </section>
    )
}
