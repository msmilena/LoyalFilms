import React from 'react';
import ReviewItem from './ReviewItem';
const currentUser=1;
const onEditReview = (reviewId) => {
  // Lógica para editar la reseña con el ID reviewId
};
const onDeleteReview = (reviewId) => {
  // Lógica para eliminar la reseña con el ID reviewId
};
const ReviewList = ({ reviews }) => {
  const [editingReviewId, setEditingReviewId] = React.useState(null);
  const [editedReviewText, setEditedReviewText] = React.useState('');

  const onEditReview = (reviewId) => {
    // Lógica para editar la reseña con el ID reviewId
    // Puedes implementar la lógica según tus necesidades, por ejemplo, hacer una solicitud al servidor para actualizar la reseña.
    // Después de editar, debes limpiar el estado de edición.
    console.log(`Editando la reseña con ID: ${reviewId} - Nuevo texto: ${editedReviewText}`);
    // Aquí podrías hacer una solicitud al servidor para actualizar la reseña con reviewId y el nuevo texto.
    // Después de editar, limpiamos el estado de edición.
    setEditingReviewId(null);
    setEditedReviewText('');
  };

  const onDeleteReview = (reviewId) => {
    // Lógica para eliminar la reseña con el ID reviewId
    // Puedes implementar la lógica según tus necesidades, por ejemplo, hacer una solicitud al servidor para eliminar la reseña.
    console.log(`Eliminando la reseña con ID: ${reviewId}`);
    // Aquí podrías hacer una solicitud al servidor para eliminar la reseña con reviewId.
  };

  return (
    <div>
      <h2>Reseñas</h2>
      <ul>
        {reviews.map(review => (
          <ReviewItem
            key={review.id}
            username={review.username}
            rating={review.rating}
            text={review.text}
            isCurrentUser={currentUser && currentUser === review.userId}
            onEdit={onEditReview}
            onDelete={onDeleteReview}
            editingReviewId={editingReviewId}
            editedReviewText={editedReviewText}
            setEditingReviewId={setEditingReviewId}
            setEditedReviewText={setEditedReviewText}
          />
        ))}
      </ul>
    </div>
  );
}

export default ReviewList;
