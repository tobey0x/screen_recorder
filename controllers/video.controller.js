const fs = require("fs");
const multer = require("multer");

const videos = []

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    const uniqueID = Date.now() + '-' + Math.random().toString(36).substring(7);
    const fileName = uniqueID + path.extname(file.originalname);
    videos.push({ id: uniqueID, filename: fileName });
    cb(null, fileName);
  },
});

const upload = multer({ storage });

const uploadVideo = upload.single('video');

const uploadVideoChunk = (req, res) => {
  try {
    const uploadedVideo = videos.find((video) => video.filename === req.file.filename);

    if (!uploadedVideo) {
      throw new Error('Error processing the uploaded video');
    }

    res.json({ message: 'Video uploaded successfully', videoId: uploadedVideo.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};


const getVideo = (req, res) => {
  const { id } = req.params;
  const filePath = `./uploads/${filename}`;

  // Check if the file exists
  if (fs.existsSync(filePath)) {
    const stat = fs.statSync(filePath);

    res.writeHead(200, {
      'Content-Type': 'video/webm',
      'Content-Length': stat.size,
    });

    const readStream = fs.createReadStream(filePath);
    readStream.pipe(res);
  } else {
    res.status(404).send('Video not found');
  }
};




module.exports = {
  getVideo,
  uploadVideo,
  uploadVideoChunk,
}