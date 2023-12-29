// const { useEffect, useState } = React
// const { useParams, useNavigate, Link } = ReactRouterDOM

import { useEffect, useState } from "react"
import { toyService } from "../../services/toy.service.js"
import { showErrorMsg } from "../../services/event-bus.service.js"
import { useNavigate, useParams } from "react-router-dom"

export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const { toyId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadToy()
    }, [toyId])

    async function loadToy() {
        try {
          const toyToGet = await toyService.getById(toyId)
          setToy(toyToGet)  
        } catch (err) {
            console.log('Had issues in toy details', err)
            showErrorMsg('Cannot load toy')
            navigate('/catalog')
        }
    }

    if (!toy) return <div>Loading...</div>
    return (
        <section className="toy-details">
            <section className="toy-image-slider">

            <img src={toy.img}></img>
            </section>
            <section className="toy-information">
            <h1>{toy.name}</h1>
            <div className="addons">
                <input type="checkbox" name="" id="" />
                <label>wrapping paper and greeting card for $1</label>
            </div>
            <div className="amount flex align-center">
            <button>Add 1</button>
            <h5>Price: ${toy.price}</h5>
            </div>
            <div className="toy-details-actions">

            <button>Add to cart</button>
            <button>❤️</button>
            </div>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi voluptas cumque tempore, aperiam sed dolorum rem! Nemo quidem, placeat perferendis tempora aspernatur sit, explicabo veritatis corrupti perspiciatis repellat, enim quibusdam!</p>
            </section>
        </section>
    )
}


