import React, { useState, useEffect } from 'react';
import { TextField, Button, Rating, Box, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { showErrorMsg, showSuccessMsg } from '../../services/event-bus.service';
import { addReview, loadReviews } from '../../store/actions/review.actions';

export function ReviewAdd() {
  const users = useSelector(storeState => storeState.userModule.users);
  const loggedInUser = useSelector(storeState => storeState.userModule.user);
  const reviews = useSelector(storeState => storeState.reviewModule.reviews);

  const [reviewToEdit, setReviewToEdit] = useState({ txt: '', rate: '', byUserId: '', aboutToyId: '' });
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    loadReviews()

    // Todo - Add socket listener

    return () => {
      // Todo - Turn off socket listener
    };
  }, []);

  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
  };

  const handleReviewTextChange = (event) => {
    setReviewText(event.target.value);
  };

  const onAddReview = async () => {
    if (!reviewText || !loggedInUser._id) {
      return alert('All fields are required');
    }

    const reviewToAdd = {
      txt: reviewText,
      byUserId: loggedInUser._id,
      rate: rating,
      aboutToyId: '658db7975f0552e3a1c043a2'
    };
    try {

      await addReview(reviewToAdd)
      showSuccessMsg('Review added');
      setReviewToEdit({ txt: '', rate: '', byUserId: '', aboutToyId: '' });
      setRating(0);
      setReviewText('');
    } catch (err) {
      showErrorMsg('Cannot add review');
    }
  };

  return (
    <section className='review-section'>
      <Typography variant="h6">Customer Reviews</Typography>
      <Box mb={2}>
        <Rating
          name="rating"
          value={rating}
          precision={0.5}
          onChange={handleRatingChange}
        />
      </Box>
      <TextField
        label="Write your review"
        multiline
        rows={4}
        fullWidth
        value={reviewText}
        onChange={handleReviewTextChange}
      />
      <Box mt={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={onAddReview}
        >
          Submit Review
        </Button>
      </Box>
    </section>
  );
}
