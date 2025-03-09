import React from "react";
import WorkoutRow from "./WorkoutRow";
import WorkoutCompleted from "./WorkoutCompleted";

const WorkoutPane = ({ workout, data, isActive, updateData, onExerciseClick, onTargetClick }) => {

  return (
    <div className={`sculptor__workout ${isActive ? "active" : ""}`}>
      <h2 className="sculptor__workout-title">
        {workout.muscles.join(" . ")}
      </h2>

      {workout.muscles.map((muscleName) => {
        const muscle = data.muscles.find((m) => m.mainMuscle === muscleName);

        return muscle
          ? muscle.targetMuscle.map((target, idx) => (
              <WorkoutRow
                key={idx}
                muscle={muscle}
                target={target}
                data={data}
                onExerciseClick={onExerciseClick}
                onTargetClick={onTargetClick}
              />
            ))
          : null;
      })}

      <WorkoutCompleted
        workout={workout}
        updateData={updateData}
      />
    </div>
  );
};

export default WorkoutPane;
