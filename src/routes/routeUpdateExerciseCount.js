const express = require("express");
const fs = require("fs");
const router = express.Router();

const DATA_FILE = "./public/data.json";

// Helper to read JSON data
const readData = () => JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));

router.post("/update-exercise", (req, res) => {
  const { muscles, exercises } = req.body;
  let data = readData();
  let updated = false;

  data.exercises.forEach((exercise) => {
    if (muscles.includes(exercise.mainMuscle) && exercises.includes(exercise.name)) {
      console.log("🚀 ~ Updating exercise:", exercise.name);

      if (exercise.countFrequency < exercise.orderFrequency) {
        exercise.countFrequency += 1;
        updated = true;
      } else if (exercise.countFrequency === exercise.orderFrequency) {
        // Find all related exercises with the same mainMuscle and targetMuscle
        let relatedExercises = data.exercises.filter(
          (ex) => ex.mainMuscle === exercise.mainMuscle && ex.targetMuscle === exercise.targetMuscle
        );

        // Increment order for each related exercise
        relatedExercises.forEach((ex) => {
          ex.order += 1;
          updated = true;
        });

        // Find the exercise with the highest order
        let maxOrderExercise = relatedExercises.reduce(
          (max, ex) => (ex.order > max.order ? ex : max),
          relatedExercises[0]
        );

        if (maxOrderExercise) {
          console.log(
            `🚀 Resetting order for ${maxOrderExercise.name} from ${maxOrderExercise.order} to 1`
          );
          maxOrderExercise.order = 1;
          updated = true;
        }

        // Reset count frequency for the updated exercise
        exercise.countFrequency = 1;
      }
    }
  });

  if (!updated) {
    console.log("⚠️ No exercises were updated!");
    return res
      .status(400)
      .json({ error: "No exercises matched the criteria." });
  }

  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  return res.json({
    message: "Workout updated successfully",
    exercises: data.exercises,
    muscles: muscles,
  });
});

module.exports = router;
