// const router = require("express").Router();
const path = require("path");
// const Workout = require("../models");
let db = require("../models");

module.exports = function (app) {

    // New workout, creates an id (index)
    // app.post("/api/workouts", ({ body }, res) => {
    //     Workout.create(body)
    //         .then(dbWorkout => {
    //             res.json(dbWorkout);
    //         })
    //         .catch(err => {
    //             res.status(400).json(err);
    //         });
    // });

    // // Add exercise, updates an existing workout
    // app.put("/api/workouts/:id", (req, res) => {
    //     Workout.findOneAndUpdate(
    //         { _id: req.params.id },
    //         {
    //             $inc: { totalDuration: req.body.duration },
    //             $push: { exercises: req.body }
    //         },
    //         { new: true }).then(dbWorkout => {
    //             res.json(dbWorkout);
    //         }).catch(err => {
    //             res.json(err);
    //         });
    //     // Workout.updateOne({ _id: req.params.id },
    //     //     {
    //     //         $inc: { totalDuration: req.body.duration },
    //     //         $push: { exercises: req.body }
    //     //         // Another way to add by object literal
    //     //         // $push: {
    //     //         //     exercises: {
    //     //         //          type: req.body.type,
    //     //         //          name: req.body.name
    //     //         //     }
    //     //         // }
    //     //     })
    //     //     .then(dbWorkout => {
    //     //         res.json(dbWorkout);
    //     //     })
    //     //     .catch(err => {
    //     //         res.status(400).json(err);
    //     //     });
    // });

    // // Get all workouts
    // app.get("/api/workouts", (req, res) => {
    //     Workout.find({}).then(dbWorkout => {
    //         dbWorkout.forEach(workout => {
    //             let total = 0;
    //             workout.exercises.forEach(e => {
    //                 total += e.duration;
    //             });
    //             workout.totalDuration = total;
    //         });
    //         res.json(dbWorkout);
    //     }).catch(err => {
    //         res.json(err);
    //     });
    //     // Workout.find({})
    //     //     .sort({ date: -1 })
    //     //     .then(dbWorkout => {
    //     //         res.json(dbWorkout);
    //     //     })
    //     //     .catch(err => {
    //     //         res.status(400).json(err);
    //     //     });
    // });

    // app.get("/api/workouts/range", (req, res) => {
    //     Workout.find({}).then(dbWorkout => {
    //         res.json(dbWorkout);
    //     }).catch(err => {
    //         res.json(err);
    //     });
    // });





    // Used by api.js to get last workout
    app.get("/api/workouts", (req, res) => {
        db.Workout.find({})
            .then(workout => {
                res.json(workout);
            })
            .catch(err => {
                res.json(err);
            });
    });

    // Creates a new workout in the workout database
    app.post("/api/workouts", async (req, res) => {
        try {
            const response = await db.Workout.create({ type: "workout" })
            res.json(response);
        }
        catch (err) {
            console.log("error occurred creating a workout: ", err)
        }
    })

    // Used by api.js to add an exercise to a workout
    app.put("/api/workouts/:id", ({ body, params }, res) => {
        // console.log(body, params)
        const workoutId = params.id;
        let savedExercises = [];

        // gets all the currently saved exercises in the current workout
        db.Workout.find({ _id: workoutId })
            .then(dbWorkout => {
                // console.log(dbWorkout)
                savedExercises = dbWorkout[0].exercises;
                res.json(dbWorkout[0].exercises);
                let allExercises = [...savedExercises, body]
                console.log(allExercises)
                updateWorkout(allExercises)
            })
            .catch(err => {
                res.json(err);
            });

        function updateWorkout(exercises) {
            db.Workout.findByIdAndUpdate(workoutId, { exercises: exercises }, function (err, doc) {
                if (err) {
                    console.log(err)
                }

            })
        }

    })

    app.get("/api/workouts/range", (req, res) => {
        db.Workout.find({})
            .then(workout => {
                res.json(workout);
            })
            .catch(err => {
                res.json(err);
            });
    });


    // route for the stats page
    app.get("/stats", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/stats.html"));
    });

    app.get("/exercise", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/exercise.html"));
    });

    app.get("/", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });

}
// module.exports = router;
