const express = require("express");

const router = express.Router();

router.post("/upload", (req, res) => {
  arr = [];
  console.log("hello")
  return res.status(200).json(arr);
});

module.exports = router;
