import React from "react";

const WorkoutCompleted = ({ workout, updateData }) => {
  // console.log("🚀 ~ WorkoutPost ~ workout:", workout)
  // console.log("🚀 ~ WorkoutPost ~ exercises:", exercises)

  const handleWorkoutCompletion = (event) => {
    event.preventDefault();
    
    // Find all elements with the class 'workout-form__excercise-equipment' inside the current workout section
    const exerciseRow = document.querySelectorAll(".sculptor__workout.active .sculptor__excercise-row");
    
    const exerciseIds = [];
    const historyEntries = [];

    // Get today's date in YYYY-MM-DD format
    const today = new Date();
    const pad = (num) => String(num).padStart(2, '0');
    const formattedDateTime = `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())} ` +
                              `${pad(today.getHours())}:${pad(today.getMinutes())}:${pad(today.getSeconds())}`;

    exerciseRow.forEach((row) => {
      // Get the exercise id from the data attribute
      const exerciseId = Number(row.getAttribute("data-exercise-id"));
      exerciseIds.push(exerciseId);
  
      // Get the exercise name from the child element
      const nameElem = row.querySelector(".workout-form__excercise-name");
      if (!nameElem || nameElem.textContent === "-") return;
      const exerciseName = nameElem.textContent;
  
      // Get all four set inputs
      const inputElements = row.querySelectorAll(".workout-form__input");
      const setValues = Array.from(inputElements).map(input => {
        const numericValue = parseFloat(input.value);
        // If input is empty or numeric value is 0, use the placeholder instead
        if (!input.value || numericValue === 0) {
          const placeholderValue = parseFloat(input.placeholder);
          return isNaN(placeholderValue) ? 0 : placeholderValue;
        }
        return numericValue;
      });
      // Ensure we have exactly 4 set values
      const [set1, set2, set3, set4] = [...setValues, 0, 0, 0, 0].slice(0, 4);
  
      // Build the history record for this exercise
      historyEntries.push({
        date: formattedDateTime,
        exercise: exerciseName,
        exerciseId,
        set1,
        set2,
        set3,
        set4,
      });
    });

    fetch("http://localhost:5000/update-exercise", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        muscles: workout.muscles,
        exercises: exerciseIds, // ✅ Send exercises data to the server
        history: historyEntries, // ✅ Send history data to the server
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


export default WorkoutCompleted;
