import React from 'react';

const ElemSelectTarget = ({ name, exercise, handleChange, targetMuscleOptions }) => {
  return (
    <select
      name= {name}
      value={exercise.targetMuscle}
      onChange={handleChange}
      disabled={!exercise.mainMuscle || targetMuscleOptions.length === 0}
    >
      <option value="">Select Target Muscle</option>
      {targetMuscleOptions.map((target, index) => (
        <option key={index} value={target}>
          {target}
        </option>
      ))}
    </select>
    
  );
}

export default ElemSelectTarget;