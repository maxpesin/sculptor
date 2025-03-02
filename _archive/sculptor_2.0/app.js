const express = require('express');
const exphbs  = require('express-handlebars');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// DATABASE - MONGODB**************************
// ********************************************

// Map global promise to get rid of deprication warning
mongoose.Promise = global.Promise;

// Connect to mongose
mongoose.connect('mongodb://localhost/sculptor', {
    useMongoClient: true
})
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err));

// Load Exercise Model
require('./models/Exercise');
const Exercise = mongoose.model('exercise');

// Load Routine Model
require('./models/Routine');
const Routine = mongoose.model('routine');


// MIDDLEWARE**********************************
// ********************************************
// Handlebars Middleware
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Method override middleware
app.use(methodOverride('_method'));


// MAIN INDEX**********************************
// ********************************************
// Index Page Route
app.get('/', (req, res) => {
    const title = 'Welcome1';
    res.render('index', {
        title: title
    });
});


// ABOUT***************************************
// ********************************************
// About Page Route
app.get('/about', (req, res) => {
    res.render('about');
});


// ROUTINE*************************************
// ********************************************
// Routine Page Route
app.get('/routines', (req, res) => {
    Routine.find({})
    .sort({date:'desc'})
    .then(routine => {
        res.render('routines/indexRoutine', {
            routine:routine
        });
    });
});
// Add Routine Form
app.get('/routines/addRoutine', (req, res) => {
    res.render('routines/addRoutine');
});

// Process Routine Form
app.post('/routines', (req, res) => {
    let errors = [];
    
    if(!req.body.subject){
        errors.push({text:'Please add exercise name'});
    }
    if(!req.body.muscleTarget){
        errors.push({text:'Please add muscle Target'});
    }
    if(!req.body.musclePrimary){
        errors.push({text:'Please add Primary Muscle'});
    }
    if(!req.body.startDate){
        errors.push({text:'Please add Routine date'});
    }
    if(errors.length > 0){
        res.render('routines/addRoutine', {
        errors: errors,
        subject: req.body.subject,
        muscleTarget: req.body.muscleTarget,
        musclePrimary: req.body.musclePrimary,
        startDate: req.body.startDate
    });
    } else {
        const newUser = {
            subject: req.body.subject,
            muscleTarget: req.body.muscleTarget,
            musclePrimary: req.body.musclePrimary,
            startTime: req.body.startTime,
            startDate: req.body.startDate
        };
        new Routine(newUser)
            .save()
            .then(routine => {
            res.redirect('/routines');
        });
    }
});

// Edit Routine Form
app.get('/routines/editRoutine/:id', (req, res) => {
    Routine.findOne({
        _id: req.params.id
    })
    .then(routine => {
        res.render('routines/editRoutine', {
            routine:routine
        });
    });
});

// Edit Routine Form
app.put('/routines/:id', (req, res) => {
    Routine.findOne({
        _id: req.params.id
    })
    .then(routine => {
        routine.subject = req.body.subject;
        routine.muscleTarget = req.body.muscleTarget;
        routine.musclePrimary = req.body.musclePrimary;
        routine.startDate = req.body.startDate;
        routine.startTime = req.body.startTime;
         
          routine.save()
            .then(routine => {
        res.redirect('/routines');
        });
    });
});

// Delete Exercise
app.delete('/routines/:id', (req, res) => {
    Routine.remove({_id: req.params.id})
    .then(() => {
        res.redirect('/routines');
    });
});

// EXERCISES***********************************
// ********************************************

// Exercise Page Route
app.get('/exercises', (req, res) => {
    Exercise.find({})
    .sort({exercise:'desc'})
    .then(exercises => {
        res.render('exercises/index', {
            exercises:exercises
        });
    });
});
// Add Exercise Form
app.get('/exercises/add', (req, res) => {
    res.render('exercises/add');
});

// Process Exercise Form
app.post('/exercises', (req, res) => {
    let errors = [];
    
    if(!req.body.exercise){
        errors.push({text:'Please add exercise name'});
    }
    if(!req.body.muscleTarget){
        errors.push({text:'Please add muscle Target'});
    }
    if(!req.body.musclePrimary){
        errors.push({text:'Please add Primary Muscle'});
    }
    if(errors.length > 0){
        res.render('exercises/add', {
        errors: errors,
        exercise: req.body.exercise,
        muscleTarget: req.body.muscleTarget,
        musclePrimary: req.body.musclePrimary
    });
    } else {
        const newUser = {
            exercise: req.body.exercise,
            muscleTarget: req.body.muscleTarget,
            musclePrimary: req.body.musclePrimary
        };
        new Exercise(newUser)
            .save()
            .then(exercise => {
            res.redirect('/exercises');
        });
    }
});

// Edit Exercise Form
app.get('/exercises/edit/:id', (req, res) => {
    Exercise.findOne({
        _id: req.params.id
    })
    .then(exercise => {
        res.render('exercises/edit', {
            exercise:exercise
        });
    });
});

// Edit Exercise Form
app.put('/exercises/:id', (req, res) => {
    Exercise.findOne({
        _id: req.params.id
    })
    .then(exercise => {
         exercise.title = req.body.title;
         exercise.details = req.body.details;
         
          exercise.save()
            .then(exercise => {
        res.redirect('/exercises');
        });
    });
});

// Delete Exercise
app.delete('/exercises/:id', (req, res) => {
    Exercise.remove({_id: req.params.id})
    .then(() => {
        res.redirect('/exercises');
    });
});


// SERVER PORT*********************************
// ********************************************
const port = 5000;

app.listen(port, () =>{
    console.log(`Server started on port ${port}`);
});