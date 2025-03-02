const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors()); // Enable CORS

const DATA_FILE = "./public/data.json";

// Read JSON data
const readData = () => JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));


// API route to update exercises
app.post("/update-exercise", (req, res) => {
  const { muscles, exercises } = req.body;
  console.log("🚀 ~ app.post ~ muscles:", muscles);
  console.log("🚀 ~ app.post ~ exercises:", exercises);

  let data = readData();


  data.exercises.forEach((exercise) => {
    if (muscles.includes(exercise.mainMuscle) && exercises.includes(exercise.name)) {
      console.log("🚀 ~ Updating exercise:", exercise.name);

      if (exercise.countFrequency < exercise.orderFrequency) {
        exercise.countFrequency += 1;
      } else if (exercise.countFrequency === exercise.orderFrequency) {
        // exercise.countFrequency = 1;

        // Step 1: Increment order value of the selected exercise
        // exercise.order += 1;

        // Step 2: Find all related exercises with the same mainMuscle and targetMuscle
        let relatedExercises = data.exercises.filter(
          (ex) => ex.mainMuscle === exercise.mainMuscle && ex.targetMuscle === exercise.targetMuscle
        );
        console.log("🚀 ~ data.exercises.forEach ~ relatedExercises:", relatedExercises)

        // lets add code hrere 
        relatedExercises.forEach((ex) => {
            ex.order += 1;
          });
        // Step 3: Find the exercise with the highest order and set it to 1
        let maxOrderExercise = relatedExercises.reduce((max, ex) =>
        ex.order > max.order ? ex : max, relatedExercises[0]
        );

        if (maxOrderExercise) {
        console.log(`🚀 Resetting order for ${maxOrderExercise.name} from ${maxOrderExercise.order} to 1`);
        maxOrderExercise.order = 1;
        }

        // Reset count frequency for the updated exercise
        exercise.countFrequency = 1;
      }
    }
  });

  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  return res.json({ message: "Workout updated successfully", exercises: data.exercises, muscles: muscles });
});

app.listen(5000, () => console.log(`🚀 Server running on http://localhost:5000`));
