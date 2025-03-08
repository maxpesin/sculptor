const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors()); // Enable CORS

// Import the routers
const routeAddExercise = require("./src/routes/routeAddExercise");
const routeUpdateExerciseCount = require("./src/routes/routeUpdateExerciseCount");

// Use the routers
app.use(routeAddExercise);
app.use(routeUpdateExerciseCount);

app.listen(5000, () => 
  console.log(`🚀 Server running on http://localhost:5000`)
);
