import React from "react";

const WorkoutRow = ({ muscle, target, data }) => {
  const workoutName = data.exercises.find(
    (ex) =>
      ex.mainMuscle === muscle.mainMuscle &&
      target === ex.targetMuscle &&
      ex.order === 1
  );

  return (
    <div className="sculptor__excercise-row">
      <span className="workout-form__workout-muscle workout-form__workout-muscle--red">
        {muscle.mainMuscle}
      </span>
      <span className="workout-form__excercise-target">{target}</span>
      <span className="workout-form__excercise-equipment">
        {workoutName ? workoutName.name : "-"}
      </span>

      <input type="text" className="workout-form__input" placeholder="Set 1" />
      <input type="text" className="workout-form__input" placeholder="Set 2" />
      <input type="text" className="workout-form__input" placeholder="Set 3" />
      <input type="text" className="workout-form__input" placeholder="Set 4" />
    </div>
  );
};

export default WorkoutRow;
