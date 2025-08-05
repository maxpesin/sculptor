import React from "react";
import WorkoutRow from "./WorkoutRow";
import WorkoutCompleted from "./WorkoutCompleted";

const WorkoutPane = ({ workout, data, isActive, updateData, onExerciseClick, onTargetClick }) => {
  // Romanized muscle group names
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
      'glutes': 'Gluteus',
      'cardio': 'Cardiovascular'
    };
    return romanNames[muscleName.toLowerCase()] || muscleName;
  };

  // Romanized target muscle names
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
    <div className={`sculptor__workout ${isActive ? "active" : ""}`}>
      <div className="workout-header-decoration">
        <div className="decorative-line left"></div>
        <div className="training-ground-emblem">
          <img 
            src="https://images.unsplash.com/photo-1619860689245-e4965fd296d3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwxfHxyb21hbiUyMHN0YXR1ZXxlbnwwfHx8YmxhY2t8MTc1NDM2MTMxOXww&ixlib=rb-4.1.0&q=85" 
            alt="Training Ground Emblem" 
            className="emblem-statue"
          />
        </div>
        <div className="decorative-line right"></div>
      </div>

      <h2 className="sculptor__workout-title">
        <span className="title-prefix">Training Ground:</span>
        <span className="title-muscles">
          {workout.muscles.map(muscle => romanizeMuscleName(muscle)).join(" • ")}
        </span>
        <span className="title-suffix">Arena</span>
      </h2>

      <div className="combat-techniques-list">
        {workout.muscles.map((muscleName) => {
          const muscle = data.muscles.find((m) => m.mainMuscle === muscleName);

          return muscle
            ? muscle.targetMuscle.map((target, idx) => (
                <div key={idx} className="technique-category">
                  <h3 className="category-title">
                    <span className="category-icon">🛡️</span>
                    {romanizeTargetName(target)} - {romanizeMuscleName(muscle.mainMuscle)}
                  </h3>
                  <WorkoutRow
                    muscle={muscle}
                    target={target}
                    data={data}
                    onExerciseClick={onExerciseClick}
                    onTargetClick={onTargetClick}
                  />
                </div>
              ))
            : null;
        })}
      </div>

      <div className="battle-completion">
        <div className="completion-decoration">
          <div className="victory-laurel left">🏛️</div>
          <WorkoutCompleted
            workout={workout}
            updateData={updateData}
          />
          <div className="victory-laurel right">🏛️</div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutPane;