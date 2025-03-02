import React from "react";
import WorkoutRow from "./WorkoutRow";

const Workout = ({ workout, index, data, isActive }) => {
  return (
    <div className={`sculptor__workout ${isActive ? "active" : ""}`}>
      <h2 className="sculptor__workout-title">
        {workout.muscles.join(" . ")}
      </h2>

      {workout.muscles.map((muscleName) => {
        const muscle = data.muscles.find((m) => m.mainMuscle === muscleName);
        return muscle
          ? muscle.targetMuscle.map((target, idx) => (
              <WorkoutRow key={idx} muscle={muscle} target={target} data={data} />
            ))
          : null;
      })}

      <button className="sculptor__workout-button" onClick={() => console.log("Workout Completed!")}>
        Completed Workout
      </button>
    </div>
  );
};

export default Workout;
