import { Link } from "react-router-dom"
// const { Link } = ReactRouterDOM
export function ToyPreview({ toy, onRemoveToy, onEditToy }) {

    return (
        <li className="toy-preview flex column space-between" key={toy._id}>
            <Link to={`/toy/${toy._id}`} >
                <h4>{toy.name}</h4>
            </Link>
            <img src={`https://robohash.org/${toy.name}`} alt="" />
            <p>Price: <span>${toy.price.toLocaleString()}</span></p>
            {/* <p>Owner: <span>{toy.owner && toy.owner.fullname}</span></p> */}
            <div className="toy-actions flex">
                <button onClick={() => {
                    onRemoveToy(toy._id)
                }}>x</button>
                <button onClick={() => {
                    onEditToy(toy)
                }}>Edit</button>
            </div>

        </li>
    )
}
