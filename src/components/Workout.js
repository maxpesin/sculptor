import React from "react";
import WorkoutRow from "./WorkoutRow";
import WorkoutPost from "./WorkoutPost";

const Workout = ({ workout, index, data, isActive, updateData }) => {

  return (
    <div className={`sculptor__workout ${isActive ? "active" : ""}`}>
      <h2 className="sculptor__workout-title">
        {workout.muscles.join(" . ")}
      </h2>

      {workout.muscles.map((muscleName) => {
        const muscle = data.muscles.find((m) => m.mainMuscle === muscleName);
        // console.log("🚀 ~ {workout.muscles.map ~ muscle:", muscle)
        return muscle
          ? muscle.targetMuscle.map((target, idx) => (
              <WorkoutRow key={idx} muscle={muscle} target={target} data={data} updateData={updateData} />
            ))
          : null;
      })}

      <WorkoutPost workout={workout} updateData={updateData} exercises={data.exercises}/>
    </div>
  );
};

export default Workout;
