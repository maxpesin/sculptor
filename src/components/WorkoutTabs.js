import React from "react";

const WorkoutTabs = ({ workouts, activeTab, setActiveTab }) => {
  // Romanized muscle group names
  const romanizeMuscleName = (muscleName) => {
    const romanNames = {
      'chest': 'Pectoralis Arena',
      'back': 'Dorsalis Grounds',
      'legs': 'Femorus Colosseum',
      'shoulders': 'Deltoideus Field',
      'triceps': 'Triceps Battleground',
      'biceps': 'Biceps Fortress',
      'arms': 'Brachialis Court',
      'core': 'Abdominalis Ring',
      'glutes': 'Gluteus Stadium',
      'cardio': 'Cardiovascular Arena'
    };
    return romanNames[muscleName.toLowerCase()] || `${muscleName} Training Ground`;
  };

  return (
    <nav className="nav nav-tabs nav-justified">
      {workouts.map((workout, index) => (
        <button
          key={index}
          className={`nav-link ${activeTab === index ? "active" : ""}`}
          onClick={() => setActiveTab(index)}
        >
          <span className="tab-icon">⚔️</span>
          <span className="tab-text">{romanizeMuscleName(workout.muscles[0])}</span>
        </button>
      ))}
    </nav>
  );
};

export default WorkoutTabs;