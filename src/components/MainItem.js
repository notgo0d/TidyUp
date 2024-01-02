// MainItem.js
import React, { useState, useEffect } from 'react';
import SubItem from './SubItem';
import './MainItem.css';

const MainItem = ({ onMainItemCreate }) => {
  const [mainItemName, setMainItemName] = useState('');
  const [mainItems, setMainItems] = useState([]);

  // Load items from localStorage on component mount
  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('mainItems')) || [];
    setMainItems(storedItems);
  }, []);

  // Save items to localStorage whenever mainItems changes
  useEffect(() => {
    localStorage.setItem('mainItems', JSON.stringify(mainItems));
  }, [mainItems]);

  const handleMainItemNameChange = (event) => {
    setMainItemName(event.target.value);
  };

  const handleMainItemButtonClick = () => {
    const newMainItem = {
      id: Date.now(),
      name: mainItemName,
      subItems: [],
    };

    setMainItems([...mainItems, newMainItem]);

    if (onMainItemCreate) {
      onMainItemCreate(newMainItem);
    }

    setMainItemName('');
  };

  const handleDeleteMainItem = (id) => {
    const updatedMainItems = mainItems.filter((item) => item.id !== id);
    setMainItems(updatedMainItems);
  };

  const handleDeleteSubItem = (mainItemId, subItemId) => {
    const updatedMainItems = mainItems.map((item) =>
      item.id === mainItemId
        ? { ...item, subItems: item.subItems.filter((subItem) => subItem.id !== subItemId) }
        : item
    );

    setMainItems(updatedMainItems);
  };

  const handleAddSubItem = (mainItemId) => {
    const subItemName = window.prompt('Enter the name for the sub-item:');
    if (subItemName !== null) {
      const updatedMainItems = mainItems.map((item) =>
        item.id === mainItemId
          ? { ...item, subItems: [...item.subItems, { id: Date.now(), name: subItemName, count: 0 }] }
          : item
      );

      setMainItems(updatedMainItems);
    }
  };

  return (
    <div className="main-item-panel">
      <label>Main Item Name:</label>
      <input type="text" value={mainItemName} onChange={handleMainItemNameChange} />
      <button className="create-btn" onClick={handleMainItemButtonClick}>
        Create Main Item
      </button>

      <ul className="main-item-list">
        {mainItems.map((item) => (
          <li key={item.id} className="main-item">
            <div className="main-item-header">
              <span className="main-item-name">{item.name}</span>
              <button className="delete-btn" onClick={() => handleDeleteMainItem(item.id)}>
                Delete Main Item
              </button>
              <button className="add-subitem-btn" onClick={() => handleAddSubItem(item.id)}>
                Add SubItem
              </button>
            </div>

            {/* Render SubItem component for each sub-item */}
            {item.subItems.map((subItem) => (
              <SubItem
                key={subItem.id}
                name={subItem.name}
                count={subItem.count}
                onDelete={() => handleDeleteSubItem(item.id, subItem.id)}
              />
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MainItem;











