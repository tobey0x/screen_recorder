const express = require("express");
const router = express.Router();
const videoController = require("../controllers/video.controller")


router.post("/upload", videoController.uploadVideoChunk);
router.get("videos/:id")

module.exports = router;