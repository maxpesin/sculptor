import React from 'react';

const ElemSelectMuscle = ({ name, exercise, handleChange, muscles }) => {
  return (
    <select 
        name={name} 
        value={exercise.mainMuscle} 
        onChange={handleChange}
    >
    <option value="">Select Main Muscle</option>
    {muscles.length > 0 ? (
      muscles.map((muscle, index) => (
        <option key={index} value={muscle.mainMuscle}>
          {muscle.mainMuscle}
        </option>
      ))
    ) : (
      <option disabled>Loading muscles...</option>
    )}
  </select>
    
  );
}

export default ElemSelectMuscle;