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

    if (!exercise.name || !exercise.mainMuscle || !exercise.targetMuscle || !exercise.equipment || !exercise.reps) {
      alert("🏛️ All fields must be completed to forge a new combat technique!");
      return;
    }

    const exerciseToSend = {
      ...exercise,
      name: exercise.name.toLowerCase(),
    };

    console.log("⚔️ Forging new combat technique:", exerciseToSend);

    fetch("/api/add-exercise", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(exerciseToSend),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("✅ Combat Technique Forged:", data);
        alert(`🏆 SUCCESS! New combat technique "${exercise.name}" has been added to your arsenal!\n\nThe technique masters approve of your innovation!`);
        updateData(); // Refresh data
        setExercise({ name: "", mainMuscle: "", targetMuscle: "", equipment: "", reps: "" }); // Reset form
      })
      .catch((err) => {
        console.error("❌ Error forging technique:", err);
        alert("⚠️ Failed to forge technique. The weapon smiths are having difficulties!");
      });
  };

  // Romanized form labels and placeholders
  const romanizeMuscleName = (muscleName) => {
    const romanNames = {
      'chest': 'Pectoralis',
      'back': 'Dorsalis',
      'legs': 'Femorus',
      'shoulders': 'Deltoideus',
      'triceps': 'Triceps',
      'biceps': 'Biceps',
      'arms': 'Brachialis',
      'core': 'Abdominalis',
      'glutes': 'Gluteus'
    };
    return romanNames[muscleName.toLowerCase()] || muscleName;
  };

  const romanizeTargetName = (targetName) => {
    const romanTargetNames = {
      'calisthenics': 'Corpus Training',
      'compound': 'Complex Maneuvers',
      'secondary': 'Support Techniques',
      'isolation': 'Focused Strikes',
      'power': 'Strength Mastery',
      'endurance': 'Stamina Building'
    };
    return romanTargetNames[targetName.toLowerCase()] || targetName;
  };

  return (
    <div className="technique-forge">
      <div className="forge-section">
        <div className="section-header">
          <span className="section-icon">⚔️</span>
          <span className="section-title">Technique Details</span>
        </div>
        
        <div className="add-exercise-form">
          <div className="form-group">
            <label className="form-label">Combat Technique Name</label>
            <input 
              type="text" 
              name="name" 
              placeholder="e.g., Gladiator Press, Victory Ascent" 
              value={exercise.name} 
              onChange={handleChange}
              className="roman-input"
            />
            <small className="form-hint">Choose a name worthy of the arena</small>
          </div>

          <div className="form-group">
            <label className="form-label">Primary Muscle Group</label>
            <Dropdown
              name="mainMuscle"
              value={exercise.mainMuscle}
              options={muscles}
              placeholder="Select Primary Target"
              handleChange={handleMainMuscleChange}
              getOptionValue={(option) => option.mainMuscle}
              getOptionLabel={(option) => `🛡️ ${romanizeMuscleName(option.mainMuscle)}`}
              className="roman-dropdown"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Combat Style</label>
            <Dropdown
              name="targetMuscle"
              value={exercise.targetMuscle}
              handleChange={handleChange}
              options={targetMuscleOptions}
              placeholder="Select Combat Style"
              getOptionLabel={(option) => `⚡ ${romanizeTargetName(option)}`}
              disabled={!exercise.mainMuscle || targetMuscleOptions.length === 0}
              className="roman-dropdown"
            />
            {!exercise.mainMuscle && (
              <small className="form-hint">First select a muscle group</small>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Gladiator Equipment</label>
            <Dropdown
              name="equipment"
              value={exercise.equipment}
              handleChange={handleChange}
              options={data.equipment || []}
              placeholder="Select Training Equipment"
              getOptionValue={(option) => option.name}
              getOptionLabel={(option) => `🏛️ ${option.name}`}
              disabled={!data.equipment}
              className="roman-dropdown"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Training Pattern</label>
            <Dropdown
              name="reps"
              value={exercise.reps}
              handleChange={handleChange}
              options={data.reps || []}
              placeholder="Select Training Pattern"
              getOptionValue={(option) => option.name}
              getOptionLabel={(option) => `📜 ${option.name}`}
              disabled={!data.reps}
              className="roman-dropdown"
            />
          </div>

          <button 
            type="button" 
            onClick={handleAddExercise}
            className="roman-button forge-button"
          >
            <span className="button-icon">🔨</span>
            <span>Forge Combat Technique</span>
          </button>
        </div>
      </div>

      <div className="forge-decoration">
        <div className="decoration-statue">
          <img 
            src="https://images.unsplash.com/photo-1567522874215-d5e2f1bee83d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwyfHxyb21hbiUyMHN0YXR1ZXxlbnwwfHx8YmxhY2t8MTc1NDM2MTMxOXww&ixlib=rb-4.1.0&q=85" 
            alt="Forge Master"
            className="statue-img"
          />
        </div>
        <div className="decoration-text">
          <h3>Forge Mastery</h3>
          <p>"Every great gladiator forges their own path to victory"</p>
          <p className="latin-quote">- Virtus Unita Fortior -</p>
        </div>
      </div>
    </div>
  );
};

export default FormAddExercise;