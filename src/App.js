import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css"; // Import your styles
import WorkoutTabs from "./components/WorkoutTabs";
import Workout from "./components/Workout";
import AddExerciseForm from "./components/AddExercise.js";
// import ExerciseDialog from "./components/ExerciseDialog"; // ✅ Import the dialog component

//TODO - hardcode history to show latest data
//TODO - update history exercises data when button pressed
//TODO - Add pound vs kilogram toggle

const App = () => {
  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState(0);

  // ✅ Define fetchData before using it
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

  // ✅ Call fetchData inside useEffect
  useEffect(() => {
    fetchData();
  }, []);

  if (!data) return <h1>Loading...</h1>;
  // console.log("🚀 ~ //useEffect ~ data:", data)

  return (
    <div className="container">
      <header>
        <h1 className="app-title">🏋️ Sculptor</h1>
      </header>

      {/* ✅ Add Exercise Form
      <AddExerciseForm updateData={fetchData} /> */}
      {/* ✅ Only pass `muscles` when `data` is available */}
      
      {data && <AddExerciseForm updateData={fetchData} data={data} muscles={data.muscles || []} />}


      {/* Workout Tabs */}
      <WorkoutTabs
        workouts={data.workoutSplit}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Workout Content */}
      {data.workoutSplit.map((workout, index) => (
        <Workout
          key={index}
          workout={workout}
          index={index}
          data={data}
          isActive={activeTab === index}
          updateData={fetchData}
        />
      ))}
    </div>
  );
};

export default App;
