import React from 'react';
import ReviewItem from './ReviewItem';
const currentUser=2;
const onEditReview = (reviewId) => {
  // Lógica para editar la reseña con el ID reviewId
};
const onDeleteReview = (reviewId) => {
  // Lógica para eliminar la reseña con el ID reviewId
};
const ReviewList = ({ reviews }) => {
  return (
    <div>
      <h2>Reseñas</h2>
      <ul>
        {reviews.map(review => (
          <ReviewItem
            key={review.id}
            id={review.id}
            username={review.username}
            rating={review.rating}
            text={review.text}
            isCurrentUser={currentUser && currentUser.id === review.userId}
            onEdit={onEditReview}  // Pasa la función de edición
            onDelete={onDeleteReview}  // Pasa la función de eliminación
          />
        ))}
      </ul>
    </div>
  );
}

export default ReviewList;
