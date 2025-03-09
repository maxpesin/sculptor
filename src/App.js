import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import WorkoutTabs from "./components/WorkoutTabs";
import Workout from "./components/Workout";
import AddExerciseForm from "./components/AddExercise.js";
import ExerciseDialog from "./components/ExerciseDialog.js";

//TODO add reps to rows

const App = () => {
  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState(0);

  // State for dialog control
  // const [showDialog, setShowDialog] = useState(false);
  const [showAddExerciseDialog, setShowAddExerciseDialog] = useState(false);

  const [showTargetDialog, setShowTargetDialog] = useState(false);
  const [targetOptions, setTargetOptions] = useState([]);

  const [showHistoryDialog, setShowHistoryDialog] = useState(false);
  const [exerciseHistory, setExerciseHistory] = useState([]);

  const [selectedExercise, setSelectedExercise] = useState(null);


  const fetchData = () => {
    console.log("🚀 Fetching data from server...");
    fetch("/data.json")
      .then((res) => res.json())
      .then((fetchedData) => {
        console.log("✅ Data received:", fetchedData);
        setData(fetchedData);
      })
      .catch((err) => console.error("❌ Error fetching data:", err));
  };

  useEffect(() => {
    fetchData();
  }, []);

   // Callback for when an exercise name is clicked.
   const handleExerciseClick = (exerciseId) => {
    // Find the exercise from the data.
    const exercise = data.exercises.find((ex) => ex.id === exerciseId);
    // Filter the history for that exercise.
    const history = data.history.filter((entry) => entry.exerciseId === exerciseId);
    setSelectedExercise(exercise);
    setExerciseHistory(history);
    setShowHistoryDialog(true);
  };

    // Handler for showing target options dialog
    const handleTargetClick = (exerciseId) => {
      const exercise = data.exercises.find((ex) => ex.id === exerciseId);
      if (exercise) {
        // Find all exercises with matching mainMuscle and targetMuscle
        const options = data.exercises.filter(
          (ex) =>
            ex.mainMuscle === exercise.mainMuscle &&
            ex.targetMuscle === exercise.targetMuscle
        );
        // Sort them by the order value (ascending)
        options.sort((a, b) => a.order - b.order);
        setTargetOptions(options);
        setShowTargetDialog(true);
      }
    };

  if (!data) return <h1>Loading...</h1>;
  console.log("🚀 ~ App ~ data:", data)

  return (
    <div className="container">
      <header class="sculptor__header">
        <h1 className="app-title">🏋️ Sculptor</h1>
        <button class="sculptor__button-add-exercise" onClick={() => setShowAddExerciseDialog(true)}>
          + Exercise
        </button>
      </header>

      {/* Example of dialog usage */}
      <ExerciseDialog isOpen={showAddExerciseDialog} onClose={() => setShowAddExerciseDialog(false)}>
        {/* You can put any content here, e.g. a form */}
        <h2>Add New Exercise</h2>
        <AddExerciseForm
          updateData={fetchData}
          data={data}
          muscles={data.muscles || []}
        />
      </ExerciseDialog>
{/* 
      <AddExerciseForm
        updateData={fetchData}
        data={data}
        muscles={data.muscles || []}
      /> */}

      <WorkoutTabs
        workouts={data.workoutSplit}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {data.workoutSplit.map((workout, index) => (
        <Workout
          workout={workout}
          data={data}
          isActive={activeTab === index}
          updateData={fetchData}
          onExerciseClick={handleExerciseClick}
          onTargetClick={handleTargetClick}
        />
      ))}

      {/* Render the dialog with the exercise history */}
      <ExerciseDialog isOpen={showHistoryDialog} onClose={() => setShowHistoryDialog(false)}>
        {selectedExercise && (
          <>
            <h2>{selectedExercise.name} History</h2>
            {exerciseHistory.length > 0 ? (
              <ul>
                {exerciseHistory.map((entry, idx) => {
                  // Format the date as "Jan 12, 2024"
                  const formattedDate = new Date(entry.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  });
                  return (
                    <li key={idx}>
                      {formattedDate} - Set1: {entry.set1}, Set2: {entry.set2}, Set3: {entry.set3}, Set4: {entry.set4}
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p>No history available.</p>
            )}
          </>
        )}
      </ExerciseDialog>


      {/* Target Options Dialog */}
      <ExerciseDialog isOpen={showTargetDialog} onClose={() => setShowTargetDialog(false)}>
        <h2>Target Options</h2>
        {targetOptions.length > 0 ? (
          <ol>
            {targetOptions.map((option) => (
              <li key={option.id}>
                Order {option.order}: {option.name} (Reps: {option.reps})
              </li>
            ))}
          </ol>
        ) : (
          <p>No target options available.</p>
        )}
      </ExerciseDialog>



    </div>
  );
};

export default App;
