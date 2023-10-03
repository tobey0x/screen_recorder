const fs = require('fs');
const multer = require('multer');
const path = require('path');


// const trackProgress = (req, res, next) => {
//   if (!req.app.progress) {
//     req.app.progress = {};
//   }

//   const { id } = req.body;

//   if (!req.app.progress[id]) {
//     req.app.progress[id] = {
//       received: 0,
//       total: req.headers['content-length'],
//     };
//   }

//   req.on('data', (chunk) => {
//     req.app.progress[id].received += chunk.length;
//     const percent = (req.app.progress[id].received / req.app.progress[id].total) * 100;
//     console.log(`Upload progress for ID ${id}: ${percent.toFixed(2)}%`);
//   });

//   req.on('end', () => {
//     console.log(`Upload complete for ID ${id}`);
//     next();
//   });
// };

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
  // trackProgress,
};
