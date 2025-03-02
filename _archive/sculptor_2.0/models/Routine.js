const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const RoutineSchema = new Schema({
    subject:{
        type: String,
        required: true
    },
    muscleTarget: {
        type: String,
        required: true
    },
    musclePrimary: {
        type: String,
        required: true
    },
    startDate:{
        type: String,
        required: true
    },
    startTime:{
        type: String,
    }
});

mongoose.model('routine', RoutineSchema);