const router = require("express").Router();
let Exercise = require("../models/exercise.model");

//route for users for http get request
router.route("/").get((req, res) => {
  Exercise.find() // finds all exercises and returns promise
    .then((exercises) => res.json(exercises)) //returns all exercises as json
    .catch((err) => res.status(400).json("Error: " + err));
});

//route for user for http post request
router.route("/add").post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const age = Number(req.body.age);
  const date = Date.parse(req.body.date);
  const newExercise = new Exercise({
    username,
    description,
    duration,
    age,
    date,
  });

  newExercise
    .save()
    .then(() => res.json("Exercise added!"))
    .catch((err) => res.status(400).json("Error:" + err));
});

module.exports = router;
