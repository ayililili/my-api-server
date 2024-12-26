var express = require("express");
var router = express.Router();

router.get("/", function (req, res) {
  res.status(200).json({ message: "Service is healthy" });
});

module.exports = router;
