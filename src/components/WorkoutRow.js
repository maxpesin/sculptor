import React, { useState, useEffect } from "react";

const WorkoutRow = ({ muscle, target, data, updateData}) => {
// console.log("🚀 ~ WorkoutRow ~ muscle:", muscle)

  const [history, setHistory] = useState([]);

  // if (!data || !data.exercises) {
  //   console.error("❌ No exercise data found:", data);
  //   return null; // Prevents the component from rendering if data is missing
  // }

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

  // console.log("🚀 ~ useEffect ~ exercise:", exercise)
  // console.log("🚀 ~ WorkoutRow ~ history:", history)
  // console.log("🚀 Found exercise:", exercise);

  return (
    <div className="sculptor__excercise-row" data-exercise-id={exercise ? exercise.id : null}>
      <span className="workout-form__workout-muscle workout-form__workout-muscle--red">
        {muscle.mainMuscle}
      </span>
      <span className="workout-form__excercise-target">{target}</span>
      <span className="workout-form__excercise-name">
        {exercise ? exercise.name : "-"}
      </span>
  
        {/* ✅ Always render 4 inputs (either with history or empty placeholders) */}
        {Array.from({ length: 4 }).map((_, index) => {
        const lastEntry = history.length > 0 ? history[history.length - 1] : null;
        const setKey = `set${index + 1}`;
        const value = lastEntry ? lastEntry[setKey] || "-" : "-"; // ✅ Use history if available, otherwise show `"-"`

        return (
          <input
            key={index}
            type="text"
            className="workout-form__input TEST"
            placeholder={value}
          />
        );
      })}
    </div>
  );
};

export default WorkoutRow;
