import React, { useState } from "react";
import ElemSelectMuscle from "./elements/ElemSelectMuscle.js";
import ElemSelectTarget from "./elements/ElemSelectTarget.js";
import ElemSelectEquipment from "./elements/ElemSelectEquipment.js";
import ElemSelectReps from "./elements/ElemSelectReps.js";

const AddExerciseForm = ({ updateData, data, muscles = [] }) => {
  const [exercise, setExercise] = useState({
    name: "",
    mainMuscle: "",
    targetMuscle: "",
    equipment: "",
    reps: "",
  });

  const handleChange = (e) => {
    setExercise({ ...exercise, [e.target.name]: e.target.value });
  };

//   ✅ When `mainMuscle` changes, reset `targetMuscle`
  const handleMainMuscleChange = (e) => {
    const selectedMuscle = e.target.value;
    setExercise({ ...exercise, mainMuscle: selectedMuscle, targetMuscle: "" });
  };

 // ✅ Find the selected `mainMuscle` in `muscles` data
 const selectedMuscleData = muscles.find((muscle) => muscle.mainMuscle === exercise.mainMuscle);

 // ✅ Get available `targetMuscle` options from the selected `mainMuscle`
 const targetMuscleOptions = selectedMuscleData ? selectedMuscleData.targetMuscle : [];

  const handleAddExercise = () => {
    // ✅ Convert `name` to lowercase ONLY before sending to the server
    const exerciseToSend = {
        ...exercise,
        name: exercise.name.toLowerCase(), // ✅ Force lowercase here
        };

    fetch("http://localhost:5000/add-exercise", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(exerciseToSend),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("✅ Exercise Created:", data);
        updateData(); // Refresh data
        setExercise({ name: "", mainMuscle: "", targetMuscle: "", equipment: "", reps: "" }); // Reset form
      })
      .catch((err) => console.error("❌ Error creating exercise:", err));
  };

  return (
    <div className="add-exercise-form">
      <input type="text" name="name" placeholder="Exercise Name" value={exercise.name} onChange={handleChange} />

      <ElemSelectMuscle
        name="mainMuscle"
        exercise={exercise}
        muscles={muscles}
        handleChange={handleMainMuscleChange} />

      <ElemSelectTarget
        name="targetMuscle"
        exercise={exercise}
        targetMuscleOptions={targetMuscleOptions}
        handleChange={handleChange} />

      <ElemSelectEquipment
        name="equipment"
        equipment={data.equipment}
        handleChange={handleChange} />

      <ElemSelectReps
        name="reps"
        reps={data.reps}
        handleChange={handleChange} />

      <button onClick={handleAddExercise}>Add Exercise</button>
    </div>
  );
};

export default AddExerciseForm;
