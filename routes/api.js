const router = require("express").Router();
const path = require("path");
const Workout = require("../models/workout.js");

// New workout, creates an id (index)
router.post("/api/workouts", ({ body }, res) => {
    Workout.create(body)
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

// Add exercise, updates an existing workout
router.put("/api/workouts/:id", (req, res) => {
    Workout.findOneAndUpdate(
        { _id: req.params.id },
        {
            $inc: { totalDuration: req.body.duration },
            $push: { exercises: req.body }
        },
        { new: true }).then(dbWorkout => {
            res.json(dbWorkout);
        }).catch(err => {
            res.json(err);
        });
    // Workout.updateOne({ _id: req.params.id },
    //     {
    //         $inc: { totalDuration: req.body.duration },
    //         $push: { exercises: req.body }
    //         // Another way to add by object literal
    //         // $push: {
    //         //     exercises: {
    //         //          type: req.body.type,
    //         //          name: req.body.name
    //         //     }
    //         // }
    //     })
    //     .then(dbWorkout => {
    //         res.json(dbWorkout);
    //     })
    //     .catch(err => {
    //         res.status(400).json(err);
    //     });
});

// Get all workouts
router.get("/api/workouts", (req, res) => {
    Workout.find({}).then(dbWorkout => {
        dbWorkout.forEach(workout => {
            let total = 0;
            workout.exercises.forEach(e => {
                total += e.duration;
            });
            workout.totalDuration = total;
        });
        res.json(dbWorkout);
    }).catch(err => {
        res.json(err);
    });
    // Workout.find({})
    //     .sort({ date: -1 })
    //     .then(dbWorkout => {
    //         res.json(dbWorkout);
    //     })
    //     .catch(err => {
    //         res.status(400).json(err);
    //     });
});

router.get("/api/workouts/range", (req, res) => {
    Workout.find({}).then(dbWorkout => {
        console.log("ALL WORKOUTS");
        console.log(dbWorkout);

        res.json(dbWorkout);
    }).catch(err => {
        res.json(err);
    });
});

// route for the stats page
router.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/stats.html"));
});

module.exports = router;
