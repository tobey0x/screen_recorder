const express = require("express");
const router = express.Router();
const videoController = require("../controllers/video.controller")


router.post('/upload', videoController.uploadVideo);
router.get("videos/:id", videoController.getVideo);

module.exports = router;