const router = require("express").Router();
let User = require("../models/user.model");

//route for users for http get request
router.route("/").get((req, res) => {
  User.find() //finds all users and returns promise
    .then((users) => res.json(users)) //returns all exercises as json
    .catch((err) => res.status(400).json("Error: " + err));
});

//route for user for http post request
router.route("/add").post((req, res) => {
  const username = req.body.username;

  const newUser = new User({ username });

  newUser
    .save()
    .then(() => res.json("User added!"))
    .catch((err) => res.status(400).json("Error " + err));
});

module.exports = router;
