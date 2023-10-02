const fs = require('fs');
const multer = require('multer');

// Setup Multer storage configuration
const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    // Generate a unique filename based on the initial ID
    const { id } = req.body;
    const uniqueFilename = `${id}-${Date.now()}-${file.originalname}`;
    cb(null, uniqueFilename);
  },
});
const upload = multer({ storage });

// Upload video
const uploadVideo = (req, res) => {
  res.status(200).send('Video uploaded successfully.');
};

// Serve a specific recorded video by filename
const getVideo = (req, res) => {
  const { filename } = req.params;
  const filePath = `./uploads/${filename}`;
  if (fs.existsSync(filePath)) {
    return res.sendFile(filePath, { root: '.' });
  }
  res.status(404).send('Video not found.');
};

module.exports = {
  uploadMiddleware: upload.single('video'),
  uploadVideo,
  getVideo,
};
