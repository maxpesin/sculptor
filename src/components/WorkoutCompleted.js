import React from "react";

const WorkoutCompleted = ({ workout, updateData }) => {
  const handleWorkoutComplete = () => {
    // Here we would typically make an API call to mark the workout as complete
    // For now, we'll just show an alert and refresh data
    console.log("🏆 Victory achieved in the arena!");
    
    // Play victory sound effect (if needed)
    // new Audio('/victory-sound.mp3').play().catch(() => {});
    
    alert(`⚔️ VICTORY! ⚔️\n\nYou have conquered the ${workout.muscles.join(" & ")} training ground!\n\nThe gods smile upon your dedication, gladiator!`);
    
    updateData(); // Refresh the data
  };

  return (
    <button 
      className="sculptor__workout-button victory-button"
      onClick={handleWorkoutComplete}
      type="button"
    >
      <span className="button-text">Complete Battle Training</span>
      <span className="button-subtext">Claim Your Victory</span>
    </button>
  );
};

export default WorkoutCompleted;