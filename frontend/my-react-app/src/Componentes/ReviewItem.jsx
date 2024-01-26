import React, { useState } from 'react';
import ReviewEditForm from './ReviewEditForm';

const ReviewItem = ({ id, username, rating, text, isCurrentUser, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleSaveEdit = (editedText) => {
    onEdit(id, editedText);
    setIsEditing(false);
  };

  return (
    <li>
      <p>Usuario: {username}</p>
      <p>Puntuación: {rating}</p>
      {isEditing ? (
        <ReviewEditForm
          initialText={text}
          onSave={handleSaveEdit}
          onCancel={handleCancelEdit}
        />
      ) : (
        <p>{text}</p>
      )}
      {isCurrentUser && (
        <div>
          {isEditing ? null : (
            <button onClick={handleEditClick}>Editar</button>
          )}
          <button onClick={() => onDelete(id)}>Eliminar</button>
        </div>
      )}
    </li>
  );
};

export default ReviewItem;
