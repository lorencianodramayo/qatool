const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    arr = [];
    return res.status(200).json(arr);
});

module.exports = router;
