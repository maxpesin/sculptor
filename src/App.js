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
    console.log("🏛️ Fetching gladiator data from the arena...");
    fetch("/data.json")
      .then((res) => res.json())
      .then((fetchedData) => {
        console.log("⚔️ Training data received:", fetchedData);
        setData(fetchedData);
      })
      .catch((err) => console.error("💀 Error fetching arena data:", err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Callback for when a combat technique name is clicked.
  const handleExerciseClick = (exerciseId) => {
    const exercise = data.exercises.find((ex) => ex.id === exerciseId);
    const history = data.history.filter((entry) => entry.exerciseId === exerciseId);
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

  if (!data) return (
    <div className="gladius-loading">
      <div className="loading-statue">
        <img src="https://images.unsplash.com/photo-1567522874215-d5e2f1bee83d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwyfHxyb21hbiUyMHN0YXR1ZXxlbnwwfHx8YmxhY2t8MTc1NDM2MTMxOXww&ixlib=rb-4.1.0&q=85" alt="Loading" />
        <h1 className="loading-text">Preparing the Arena...</h1>
      </div>
    </div>
  );

  return (
    <div className="gladius-arena">
      {/* Colosseum Background */}
      <div className="colosseum-background"></div>
      
      {/* Main Arena Container */}
      <div className="arena-container">
        {/* Arena Header */}
        <header className="arena-header">
          <div className="header-statue">
            <img src="https://images.unsplash.com/photo-1601887389937-0b02c26b602c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwzfHxyb21hbiUyMHN0YXR1ZXxlbnwwfHx8YmxhY2t8MTc1NDM2MTMxOXww&ixlib=rb-4.1.0&q=85" alt="Roman Statue" className="header-statue-img" />
          </div>
          <div className="header-content">
            <h1 className="arena-title">
              <span className="title-main">GLADIUS</span>
              <span className="title-sub">ARENA</span>
              <span className="title-motto">Virtus et Honor</span>
            </h1>
            <button 
              className="roman-button add-technique-btn"
              onClick={() => setShowAddExerciseDialog(true)}
              type="button"
            >
              <span className="button-icon">⚔️</span>
              <span>Add Combat Technique</span>
            </button>
          </div>
        </header>

        {/* Training Grounds Navigation */}
        <div className="training-grounds-nav">
          <h2 className="nav-title">Select Your Training Ground</h2>
          <WorkoutTabs
            workouts={data.workoutSplit}
            activeTab={activeTab}
            setActiveTab={setActiveTab} 
          />
        </div>

        {/* Battle Preparation Areas */}
        <div className="battle-preparations">
          {data.workoutSplit.map((workout, index) => (
            <WorkoutPane
              key={index}
              workout={workout}
              data={data}
              isActive={activeTab === index}
              updateData={fetchData}
              onExerciseClick={handleExerciseClick}
              onTargetClick={handleTargetClick}
            />
          ))}
        </div>
      </div>

      {/* Modal Window - Add Combat Technique */}
      <ModalWindow isOpen={showAddExerciseDialog} onClose={() => setShowAddExerciseDialog(false)}>
        <div className="modal-header-roman">
          <h2 className="modal-title">Forge New Combat Technique</h2>
          <p className="modal-subtitle">Train like the gladiators of old</p>
        </div>
        <FormAddExercise
          updateData={fetchData}
          data={data}
          muscles={data.muscles || []} 
        />
      </ModalWindow>

      {/* Modal Window - Victory Chronicles */}
      <ModalWindow isOpen={showHistoryDialog} onClose={() => setShowHistoryDialog(false)}>
        {selectedExercise && (
          <div className="victory-chronicles">
            <div className="modal-header-roman">
              <h2 className="modal-title">{selectedExercise.name} Chronicles</h2>
              <p className="modal-subtitle">Record of your battles</p>
            </div>
            {exerciseHistory.length > 0 ? (
              <div className="chronicles-list">
                {exerciseHistory.map((entry, idx) => {
                  const formattedDate = new Date(entry.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  });
                  return (
                    <div key={idx} className="chronicle-entry">
                      <div className="chronicle-date">{formattedDate}</div>
                      <div className="chronicle-details">
                        <span>Round I: {entry.set1}</span>
                        <span>Round II: {entry.set2}</span>
                        <span>Round III: {entry.set3}</span>
                        <span>Round IV: {entry.set4}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="no-chronicles">
                <p>No battle records found. Begin your training to forge your legacy!</p>
              </div>
            )}
          </div>
        )}
      </ModalWindow>

      {/* Modal Window - Combat Mastery Options */}
      <ModalWindow isOpen={showTargetDialog} onClose={() => setShowTargetDialog(false)}>
        <div className="combat-mastery">
          <div className="modal-header-roman">
            <h2 className="modal-title">Mastery Progression</h2>
            <p className="modal-subtitle">Path of the Warrior</p>
          </div>
          {targetOptions.length > 0 ? (
            <div className="mastery-list">
              {targetOptions.map((option) => (
                <div key={option.id} className="mastery-entry">
                  <div className="mastery-order">Stage {option.order}</div>
                  <div className="mastery-details">
                    <h3>{option.name}</h3>
                    <p>Training Pattern: {option.reps}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-mastery">
              <p>No mastery path available for this technique.</p>
            </div>
          )}
        </div>
      </ModalWindow>
    </div>
  );
};

export default App;