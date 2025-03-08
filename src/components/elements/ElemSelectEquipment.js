import React from 'react';

const ElemSelect = ({ name, equipment, handleChange }) => {
  return (
    <select
      name= {name}
      value={equipment || ""}
      onChange={handleChange}
      disabled={!equipment}
    >
      <option value="">Select Equipment</option>
      {equipment.map((eachItem, index) => (
        <option key={index} value={eachItem.name}>
          {eachItem.name}
        </option>
      ))}
    </select>
  );
}

export default ElemSelect;