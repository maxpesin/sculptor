import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css"; // Import your styles
import WorkoutTabs from "./components/WorkoutTabs";
import Workout from "./components/Workout";

const App = () => {
  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState(0);

  // Fetch workout data
  useEffect(() => {
    fetch("/data.json") // Update this if your JSON file is hosted elsewhere
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  if (!data) return <h1>Loading...</h1>;

  return (
    <div className="container">
      <header>
        <h1 className="app-title">🏋️ Sculptor</h1>
      </header>

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
        />
      ))}
    </div>
  );
};

export default App;
