import React, { useState } from 'react';

const ReviewEditForm = ({ initialText, onSave, onCancel }) => {
  const [editedText, setEditedText] = useState(initialText);

  const handleSave = () => {
    onSave(editedText);
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <div>
      <textarea
        value={editedText}
        onChange={(e) => setEditedText(e.target.value)}
      />
      <button onClick={handleSave}>Guardar</button>
      <button onClick={handleCancel}>Cancelar</button>
    </div>
  );
};

export default ReviewEditForm;
