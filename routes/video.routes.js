const express = require('express');
const videoController = require('../controllers/video.controller');

const router = express.Router();

router.get('/video/:filename', videoController.getVideo);
router.post('/upload', videoController.trackProgress, videoController.uploadMiddleware, videoController.uploadVideo);

module.exports = router;