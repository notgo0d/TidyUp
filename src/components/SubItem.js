// SubItem.js
import React, { useState } from 'react';

const SubItem = ({ name, count, onDelete }) => {
  const [subItemCount, setSubItemCount] = useState(count);

  const handleIncrement = () => {
    setSubItemCount(subItemCount + 1);
  };

  const handleDecrement = () => {
    if (subItemCount > 0) {
      setSubItemCount(subItemCount - 1);
    }
  };

  return (
    <div className="sub-item">
      <p>Name: {name}</p>
      <p>Count: {subItemCount}</p>

      {/* Buttons to increment and decrement count */}
      <button onClick={handleIncrement}>+</button>
      <button onClick={handleDecrement}>-</button>

      {/* Delete button */}
      {onDelete && <button onClick={onDelete}>Delete</button>}
    </div>
  );
};

export default SubItem;






