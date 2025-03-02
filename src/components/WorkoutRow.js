import React from "react";

const WorkoutRow = ({ muscle, target, data, updateData}) => {

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

  // console.log("🚀 Found exercise:", exercise);

  return (
    <div className="sculptor__excercise-row">
      <span className="workout-form__workout-muscle workout-form__workout-muscle--red">
        {muscle.mainMuscle}
      </span>
      <span className="workout-form__excercise-target">{target}</span>
      <span className="workout-form__excercise-name">
        {exercise ? exercise.name : "-"}
      </span>

      <input type="text" className="workout-form__input" placeholder="Set 1" />
      <input type="text" className="workout-form__input" placeholder="Set 2" />
      <input type="text" className="workout-form__input" placeholder="Set 3" />
      <input type="text" className="workout-form__input" placeholder="Set 4" />

    </div>
  );
};

export default WorkoutRow;
