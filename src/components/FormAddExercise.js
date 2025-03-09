import React, { useState } from "react";
import Dropdown from "./Dropdown.js"

const FormAddExercise = ({ updateData, data, muscles = [] }) => {
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

  // When `mainMuscle` changes, reset `targetMuscle`
  const handleMainMuscleChange = (e) => {
    const selectedMuscle = e.target.value;
    setExercise({ ...exercise, mainMuscle: selectedMuscle, targetMuscle: "" });
  };

  // Find the selected `mainMuscle` in `muscles` data
  const selectedMuscleData = muscles.find((muscle) => muscle.mainMuscle === exercise.mainMuscle);

  // Get available `targetMuscle` options from the selected `mainMuscle`
  const targetMuscleOptions = selectedMuscleData ? selectedMuscleData.targetMuscle : [];

  const handleAddExercise = (e) => {
    e.preventDefault();

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

      <Dropdown
        name="mainMuscle"
        value={exercise.mainMuscle}
        options={muscles}
        placeholder="Select Main Muscle"
        handleChange={handleMainMuscleChange}
        getOptionValue={(option) => option.mainMuscle}
        getOptionLabel={(option) => option.mainMuscle} />

      <Dropdown
        name="targetMuscle"
        value={exercise.targetMuscle}
        handleChange={handleChange}
        options={targetMuscleOptions}
        placeholder="Select Target Muscle"
        disabled={!exercise.mainMuscle || targetMuscleOptions.length === 0} />

      <Dropdown
        name="equipment"
        value={data.equipment || ""}
        handleChange={handleChange}
        options={data.equipment}
        placeholder="Select Equipment"
        getOptionValue={(option) => option.name}
        getOptionLabel={(option) => option.name}
        disabled={!data.equipment} />

      <Dropdown
        name="reps"
        value={data.reps || ""}
        handleChange={handleChange}
        options={data.reps}
        placeholder="Select Rep Type"
        getOptionValue={(option) => option.name}
        getOptionLabel={(option) => option.name}
        disabled={!data.reps} />

      <button type="button" onClick={handleAddExercise}>Add Exercise</button>
    </div>
  );
};

export default FormAddExercise;
