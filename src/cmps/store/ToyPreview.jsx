import { Link } from "react-router-dom"
// const { Link } = ReactRouterDOM
export function ToyPreview({ toy, onRemoveToy, onEditToy }) {

    return (
        <li className="toy-preview flex column space-between" key={toy._id}>
            <img src={toy.img} alt="" />
            <Link to={`/catalog/${toy._id}`} >
                <h4>{toy.name}</h4>
            </Link>
            <p>Price: <span>${toy.price.toLocaleString()}</span></p>
            <button className="add-to-cart">Add to cart</button>
            {/* <p>Owner: <span>{toy.owner && toy.owner.fullname}</span></p> */}
            {/* <div className="toy-actions flex">
                <button onClick={() => {
                    onRemoveToy(toy._id)
                }}>x</button>
                <button onClick={() => {
                    onEditToy(toy)
                }}>Edit</button>
            </div> */}

        </li>
    )
}
