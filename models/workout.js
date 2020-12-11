const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now
    },
    exercises: [{
        type: {
            type: String,
            trim: true
            // required: "Select the excercise type"
        },
        name: {
            type: String,
            trim: true
            // required: "Enter the excercise name"
        },
        duration: {
            type: Number
            // required: false
        },
        weight: {
            type: Number,
            default: 0
            // required: false
        },
        reps: {
            type: Number,
            default: 0
            // required: false
        },
        sets: {
            type: Number,
            default: 0
            // required: false
        },
        distance: {
            type: Number
        }
    }]
},
    {
        toJSON: {
            // include any virtual properties when data is requested
            virtuals: true
        }
    }
);

// adds a dynamically-created property to schema
workoutSchema.virtual("totalDuration").get(function () {
    // "reduce" array of exercises down to just the sum of their durations
    return this.exercises.reduce((total, exercise) => {
        return total + exercise.duration;
    }, 0);
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;