const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
require('dotenv').config();

const PORT = process.env.PORT || 8000;

const app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const PWD = process.env.DB_PWD;
const databaseUrl = `mongodb+srv://chick-flick:${encodeURIComponent(PWD)}@cluster0.fqf9a.mongodb.net/workout`;

// Connection before deployment
// mongoose.connect(databaseUrl, { useNewUrlParser: true, useFindAndModify: false });

// Connection for deployment on heroku
mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost/workout',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    }
);

const db = require("./models");

require("./routes/api")(app);

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});