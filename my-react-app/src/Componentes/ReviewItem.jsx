import React from 'react';

const ReviewItem = ({ id, username, rating, text, isCurrentUser, onEdit, onDelete }) => {
  return (
    <li>
      <p>Usuario: {username}</p>
      <p>Puntuación: {rating}</p>
      <p>{text}</p>
      {isCurrentUser && (
        <div>
          <button onClick={() => onEdit(id)}>Editar</button>
          <button onClick={() => onDelete(id)}>Eliminar</button>
        </div>
      )}
    </li>
  );
}

export default ReviewItem;