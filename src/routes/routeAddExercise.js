const express = require("express");
const fs = require("fs");
const router = express.Router();

const DATA_FILE = "./public/data.json";

const readData = () => JSON.parse(fs.readFileSync(DATA_FILE, "utf8")); // Helper to read JSON data
const generateExerciseId = () =>
  Date.now() + Math.floor(Math.random() * 1000);

router.post("/add-exercise", (req, res) => {
    try {
        let data = readData();
        const { name, mainMuscle, targetMuscle, equipment, reps } = req.body;
      
        // Find existing exercises with the same mainMuscle and targetMuscle
        const relatedExercises = data.exercises.filter(
          (ex) => ex.mainMuscle === mainMuscle && ex.targetMuscle === targetMuscle
        );
      
        // Find the highest existing order value
        const maxOrder =
          relatedExercises.length > 0
            ? Math.max(...relatedExercises.map((ex) => ex.order))
            : 0;
      
        // Create new exercise with order set to maxOrder + 1
        const newExercise = {
          name: name.toLowerCase(), // Convert to lowercase for consistency
          mainMuscle,
          targetMuscle,
          equipment,
          reps,
          order: maxOrder + 1,
          orderFrequency: 3, // Default order frequency
          countFrequency: 1, // Default frequency
          id: generateExerciseId()
        };
      
        data.exercises.push(newExercise);
        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
        console.log(`Exercise "${newExercise.name}" added successfully with ID ${newExercise.id}.`);
      
        return res.json({
          message: "Exercise added successfully",
          exercise: newExercise,
        });
    } catch (error) {
        // Log error details to the server console
        console.error("Error adding exercise:", error);
        // Send error response to client with error message
        return res.status(500).json({
            error: "Error adding exercise: " + error.message,
        });
    }
});

module.exports = router;
