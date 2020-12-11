const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    day: {
        type: Date
    },
    exercises: [{
        type: {
            type: String,
            trim: true,
            required: "Select the excercise type"
        },
        name: {
            type: String,
            trim: true,
            required: "Enter the excercise name"
        },
        duration: {
            type: Number,
            required: "Enter the duration in minutes"
        },
        weight: {
            type: Number,
            required: false
        },
        reps: {
            type: Number,
            required: false
        },
        sets: {
            type: Number,
            required: false
        }
    }]
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;