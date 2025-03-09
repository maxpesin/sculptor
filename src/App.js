import React, { useState, useEffect } from "react";
import WorkoutTabs from "./components/WorkoutTabs";
import WorkoutPane from "./components/WorkoutPane";
import ModalWindow from "./components/ModalWindow";
import FormAddExercise from "./components/FormAddExercise";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";


const App = () => {
  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
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
    const exercise = data.exercises.find((ex) => ex.id === exerciseId); // Find the exercise from the data.
    const history = data.history.filter((entry) => entry.exerciseId === exerciseId); // Filter the history for that exercise.
    setSelectedExercise(exercise);
    setExerciseHistory(history);
    setShowHistoryDialog(true);
  };

  // Handler for showing target options dialog
  const handleTargetClick = (exerciseId) => {
    const exercise = data.exercises.find((ex) => ex.id === exerciseId);
    if (exercise) {
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
        <button 
          class="sculptor__button-add-exercise"
          onClick={() => setShowAddExerciseDialog(true)}
          type="button"
        >
          + Exercise
        </button>
      </header>

      {/* Workout Tabs */}
      <WorkoutTabs
        workouts={data.workoutSplit}
        activeTab={activeTab}
        setActiveTab={setActiveTab} />

      {/* Workout Pane */}
      {data.workoutSplit.map((workout, index) => (
        <WorkoutPane
          workout={workout}
          data={data}
          isActive={activeTab === index}
          updateData={fetchData}
          onExerciseClick={handleExerciseClick}
          onTargetClick={handleTargetClick}
        />
      ))}

      {/* Modal Window - Add Exercise Form */}
      <ModalWindow isOpen={showAddExerciseDialog} onClose={() => setShowAddExerciseDialog(false)}>
        <h2>Add New Exercise</h2>
        <FormAddExercise
          updateData={fetchData}
          data={data}
          muscles={data.muscles || []} />
      </ModalWindow>

      {/* Modal Window - Exercise History */}
      <ModalWindow isOpen={showHistoryDialog} onClose={() => setShowHistoryDialog(false)}>
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
      </ModalWindow>

      {/* Modal Window - Target Exercises */}
      <ModalWindow isOpen={showTargetDialog} onClose={() => setShowTargetDialog(false)}>
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
      </ModalWindow>

    </div>
  );
};

export default App;
