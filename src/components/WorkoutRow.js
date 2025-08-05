import React, { useState } from "react";

const WorkoutRow = ({ muscle, target, data, onExerciseClick, onTargetClick }) => {
  const [exerciseValues, setExerciseValues] = useState({});

  // Filter exercises for this muscle and target combination
  const exercises = data.exercises.filter(
    (ex) => ex.mainMuscle === muscle.mainMuscle && ex.targetMuscle === target
  );

  // Sort exercises by order
  exercises.sort((a, b) => a.order - b.order);

  const handleInputChange = (exerciseId, field, value) => {
    setExerciseValues(prev => ({
      ...prev,
      [exerciseId]: {
        ...prev[exerciseId],
        [field]: value
      }
    }));
  };

  const handleUpdateExercise = (exerciseId) => {
    const values = exerciseValues[exerciseId];
    if (!values) return;

    const updateData = {
      exerciseId,
      set1: values.set1 || 0,
      set2: values.set2 || 0,
      set3: values.set3 || 0,
      set4: values.set4 || 0,
      date: new Date().toISOString().split('T')[0] // Today's date in YYYY-MM-DD format
    };

    console.log("⚔️ Recording combat performance:", updateData);

    fetch("/api/update-exercise", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("✅ Combat record updated:", data);
        alert(`🏆 Training recorded for ${exercises.find(ex => ex.id === exerciseId)?.name}!\n\nYour dedication has been inscribed in the chronicles!`);
        // Clear the inputs after successful update
        setExerciseValues(prev => ({
          ...prev,
          [exerciseId]: {}
        }));
      })
      .catch((err) => {
        console.error("❌ Error recording combat performance:", err);
        alert("⚠️ Failed to record training. The scribes are having trouble!");
      });
  };

  const romanizeExerciseName = (name) => {
    // Convert exercise names to more Roman-sounding versions
    const romanExercises = {
      'push up': 'Gladius Press',
      'pull up': 'Victory Ascent',
      'squat': 'Centurion Stance',
      'deadlift': 'Titan Lift',
      'bench press': 'Arena Press',
      'shoulder press': 'Triumph Raise',
      'bicep curl': 'Victor\'s Curl',
      'tricep dip': 'Roman Descent',
      'plank': 'Colosseum Hold',
      'burpee': 'Gladiator Challenge'
    };
    
    const lowerName = name.toLowerCase();
    return romanExercises[lowerName] || name.split(' ').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  if (exercises.length === 0) {
    return (
      <div className="sculptor__excercise-row no-techniques">
        <div className="no-techniques-message">
          <span className="message-icon">⚠️</span>
          <span>No combat techniques found for {target} {muscle.mainMuscle}</span>
          <span className="message-suggestion">Consider adding new techniques to your arsenal</span>
        </div>
      </div>
    );
  }

  return (
    <div className="combat-techniques-section">
      {exercises.map((exercise) => {
        const currentValues = exerciseValues[exercise.id] || {};
        
        return (
          <div key={exercise.id} className="sculptor__excercise-row technique-row">
            <div className="technique-info">
              <div className="technique-header">
                <span 
                  className={`sculptor__excercise-muscle-${muscle.color} muscle-badge`}
                  onClick={() => onTargetClick(exercise.id)}
                  title="View mastery progression"
                >
                  {muscle.mainMuscle}
                </span>
                <span 
                  className="technique-name"
                  onClick={() => onExerciseClick(exercise.id)}
                  title="View training chronicles"
                >
                  {romanizeExerciseName(exercise.name)}
                </span>
                <span className="technique-pattern">
                  Pattern: {exercise.reps}
                </span>
              </div>
              
              <div className="technique-details">
                <span className="detail-badge equipment">
                  🛡️ {exercise.equipment}
                </span>
                <span className="detail-badge order">
                  Stage {exercise.order}
                </span>
              </div>
            </div>

            <div className="training-inputs">
              <div className="rounds-section">
                <label className="rounds-label">Training Rounds:</label>
                <div className="rounds-grid">
                  {[1, 2, 3, 4].map(round => (
                    <div key={round} className="workout-form__input-container">
                      <label className="round-label">Round {round}:</label>
                      <input
                        type="number"
                        className="workout-form__input round-input"
                        placeholder="0"
                        value={currentValues[`set${round}`] || ''}
                        onChange={(e) => handleInputChange(exercise.id, `set${round}`, e.target.value)}
                        min="0"
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              <button
                className="roman-button record-button"
                onClick={() => handleUpdateExercise(exercise.id)}
                type="button"
              >
                <span className="button-icon">📜</span>
                <span>Record Training</span>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default WorkoutRow;