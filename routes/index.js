var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  let demo = {
    name: "Rohan",
    age: 27,
  };

  res.render("index", { demo: demo });
});

module.exports = router;
