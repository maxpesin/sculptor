import React, { useState, useEffect } from "react";

const WorkoutRow = ({ muscle, target, data, onExerciseClick, onTargetClick}) => {

  const [history, setHistory] = useState([]);
  const exercise = data.exercises.find(
    (ex) =>
      ex.mainMuscle === muscle.mainMuscle &&
      target === ex.targetMuscle &&
      ex.order === 1
  );

  useEffect(() => {
    if (exercise) {
      const workoutHistory = data.history.filter(
        (entry) => entry.exerciseId === exercise.id

      );
      setHistory(workoutHistory);
    }
  }, [data.history, exercise]); // ✅ Dependency array ensures it only runs when data.history or exercise changes

  return (
    <div className="sculptor__excercise-row" data-exercise-id={exercise ? exercise.id : null}>
      <span className={`sculptor__excercise-muscle-${muscle.color}`}>
        {muscle.mainMuscle}
      </span>
      <span 
        className="workout-form__excercise-target"
        onClick={() => onTargetClick && exercise && onTargetClick(exercise.id)}
        >
        {target}
      </span>
      <span 
        className="workout-form__excercise-name"
        onClick={() => onExerciseClick && exercise && onExerciseClick(exercise.id)}
        >
        {exercise ? exercise.name : "-"}
      </span>
  
        {/* ✅ Always render 4 inputs (either with history or empty placeholders) */}
        {Array.from({ length: 4 }).map((_, index) => {
        const lastEntry = history.length > 0 ? history[history.length - 1] : null;
        const setKey = `set${index + 1}`;
        const value = lastEntry ? lastEntry[setKey] || "-" : "-";

        return (
          <input
            key={index}
            type="text"
            className="workout-form__input"
            placeholder={value}
          />
        );
      })}

      {/* Display the exercise.reps as a span after the 4th input */}
      <span className="workout-form__excercise-reps">
        {exercise ? exercise.reps : "-"}
      </span>
    </div>
  );
};

export default WorkoutRow;
