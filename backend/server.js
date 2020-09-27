const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config(); //getting env variables from .env file

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB connection established successfully");
});

//requiring routes files
const exercisesRouter = require("./routes/exercises");
const usersRouter = require("./routes/users");
// now if someone goes to to route url and put /exercises at the end , it will load everything in the exercisesRouter file and same will be the case with /users
app.use("/exercises", exercisesRouter);
app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
