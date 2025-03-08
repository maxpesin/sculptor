import React from 'react';

const ElemSelectReps = ({ name, reps, handleChange }) => {
  return (
    <select
      name= {name}
      value={reps || ""}
      onChange={handleChange}
      disabled={!reps}
    >
      <option value="">Select Rep Type</option>
      {reps.map((repType, index) => (
        <option key={index} value={repType.name}>
          {repType.name}
        </option>
      ))}
    </select>
  );
}

export default ElemSelectReps;