import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css"; // Import your styles
import WorkoutTabs from "./components/WorkoutTabs";
import Workout from "./components/Workout";

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
