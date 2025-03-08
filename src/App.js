import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import WorkoutTabs from "./components/WorkoutTabs";
import Workout from "./components/Workout";
import AddExerciseForm from "./components/AddExercise.js";
import ExerciseDialog from "./components/ExerciseDialog.js";


const App = () => {
  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [showDialog, setShowDialog] = useState(false);

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

  if (!data) return <h1>Loading...</h1>;
  console.log("🚀 ~ App ~ data:", data)

  return (
    <div className="container">
      <header class="sculptor__header">
        <h1 className="app-title">🏋️ Sculptor</h1>
        <button class="sculptor__button-add-exercise" onClick={() => setShowDialog(true)}>
          + Exercise
        </button>
      </header>

      {/* Example of dialog usage */}
      <ExerciseDialog isOpen={showDialog} onClose={() => setShowDialog(false)}>
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
        />
      ))}
    </div>
  );
};

export default App;
