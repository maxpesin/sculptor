import React from "react";

const WorkoutPost = ({ workout, updateData, exercises }) => {
  // console.log("🚀 ~ WorkoutPost ~ workout:", workout)
  // console.log("🚀 ~ WorkoutPost ~ exercises:", exercises)

  const handleWorkoutCompletion = (event) => {
    event.preventDefault(); // ✅ Stops default button behavior (avoids page refresh)
    
    // Find all elements with the class 'workout-form__excercise-equipment' inside the current workout section
    const exerciseElements = document.querySelectorAll(".sculptor__workout.active .workout-form__excercise-name");
    // console.log("🚀 ~ exerciseElements:", exerciseElements)
    
    
    // Extract text content from each element and store it in an array
    const exercises = Array.from(exerciseElements).map(el => el.textContent.trim());
    // console.log("🚀 ~ exerciseElementsTEXTCONTENT:", exercises)
    // console.log("🚀 Completing Workout for:", workout.muscles);

    fetch("http://localhost:5000/update-exercise", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        muscles: workout.muscles,
        exercises: exercises, // ✅ Send exercises data to the server
     }),
    })
      .then((res) => res.json())
      .then((response) => {
        // console.log("✅ Workout Updated:", response);
        updateData(); // ✅ Fetch updated data instead of refreshing
      })
      .catch((err) => console.error("❌ Error updating workout:", err));
  };

  return (
    <button 
      type="button" // ✅ Explicitly set type to button
      className="sculptor__workout-button" 
      onClick={handleWorkoutCompletion}
    >
      Completed Workout
    </button>
  );
};


export default WorkoutPost;
