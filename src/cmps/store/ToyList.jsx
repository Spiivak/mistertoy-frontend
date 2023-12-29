import { ToyPreview } from "./ToyPreview.jsx";

export function ToyList({ toys, onRemoveToy, onEditToy }) {

    return (
        <ul className="toy-list clean-list">
            {toys.map(toy =>
                <ToyPreview
                    key={toy._id}
                    toy={toy}
                    onRemoveToy={onRemoveToy}
                    onEditToy={onEditToy}
                />
            )}
        </ul>
    )
}