const router = require("express").Router();
const Workout = require("../models/workout.js");

// Complete excercise
router.post("/api/workouts", ({ body }, res) => {
    Workout.create(body)
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

// Add excercise
router.put("/api/workouts/:id", (req, res) => {
    Workout.updateOne({ _id: req.params.id }, {
        exercises: {
            type: req.body.type,
            name: req.body.name
        }
    })
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

// Get all workouts
router.get("/api/workouts", (req, res) => {
    Workout.find({})
        .sort({ date: -1 })
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

module.exports = router;
