import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { loadReviews } from '../../store/actions/review.actions';

export function ReviewPreview({ reviews }) {
  console.log('ReviewPreview  reviews:', reviews)
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    onLoadReviews()
  }, [])

  async function onLoadReviews () {
    try {
      await loadReviews()
    } catch (error) {
      setIsLoading(false)
      console.error('Error loading reviews:', error);

    }
  }
  if (isLoading) return <div>Loading...</div>
  return (
    <div>
      <h2>Reviews</h2>
      {reviews.map((review) => {
        console.log('{reviews.map  review:', review)
       return <div key={review._id}>
          <p>Rating: {review.rate}</p>
          <p>Text: {review.txt}</p>
          {/* Add more details as needed */}
        </div>
      })}
    </div>
  )
}
