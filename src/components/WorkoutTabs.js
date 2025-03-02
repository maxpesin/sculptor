import React from "react";

const WorkoutTabs = ({ workouts, activeTab, setActiveTab }) => {
  return (
    <nav className="nav nav-tabs nav-justified">
      {workouts.map((workout, index) => (
        <button
          key={index}
          className={`nav-link ${activeTab === index ? "active" : ""}`}
          onClick={() => setActiveTab(index)}
        >
          {workout.muscles[0]}
        </button>
      ))}
    </nav>
  );
};

export default WorkoutTabs;
