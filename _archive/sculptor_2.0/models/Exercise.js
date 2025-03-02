const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ExerciseSchema = new Schema({
    exercise:{
        type: String,
        required: true
    },
    muscleTarget: {
        type: String,
        required: true
    },
    musclePrimary: {
        type: String,
        equired: true
    }
});

mongoose.model('exercise', ExerciseSchema);