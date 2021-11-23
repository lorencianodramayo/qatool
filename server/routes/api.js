const express = require("express");
const { multer, bucket, extendTimeout } = require("../config/config");

const router = express.Router();

router.post("/upload", extendTimeout, multer.any(), (req, res, next) => {
  console.log(req.files);
  arr = [];
  return res.status(200).json(arr);
});

module.exports = router;
