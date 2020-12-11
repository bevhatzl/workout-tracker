// const express = require("express");
// const logger = require("morgan");
// const mongoose = require("mongoose");
// require('dotenv').config();

// const PORT = process.env.PORT || 8000;

// const app = express();

// app.use(logger("dev"));
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// app.use(express.static("public"));

// const PWD = process.env.DB_PWD;
// const databaseUrl = `mongodb+srv://chick-flick:${encodeURIComponent(PWD)}@cluster0.fqf9a.mongodb.net/workout`;
// mongoose.connect(databaseUrl, { useNewUrlParser: true, useFindAndModify: false });

// const db = require("./models");

// // routes
// app.use(require("./routes/api.js"));
// // app.use(require("./routes/html.js"));

// app.listen(PORT, () => {
//     console.log(`App running on port ${PORT}!`);
// });

const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
require('dotenv').config();

const PORT = process.env.PORT || 4000;

const app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const PWD = process.env.DB_PWD;
const databaseUrl = `mongodb+srv://chick-flick:${encodeURIComponent(PWD)}@cluster0.fqf9a.mongodb.net/workout`;
mongoose.connect(databaseUrl, { useNewUrlParser: true, useFindAndModify: false });


const db = require("./models");

require("./routes/api")(app);



app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});