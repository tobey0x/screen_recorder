const fs = require("fs");
// const formidable = require("formidable");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    // Parse the filename from the request, if available
    const filename = req.body.filename || 'recorded-video.webm'; 
    cb(null, filename);
  },
});


const upload = multer({ storage });

const getVideo = (req, res) => {
  const { filename } = req.params;
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

const uploadVideo = upload.single('video');

// const getVideo = (req, res) => {
//   const { filename } = req.filename;
//   const filePath = `./uploads${filename}`;

//   if (fs.existsSync(filePath)) {
//     const stat = fs.statSync(filePath);

//     res.writeHead(200, {
//       'Content-Type': 'video/webm',
//       'Content-Length': stat.size,
//     });

//     const readStream = fs.createReadStream(filePath);
//     readStream.pipe(res);
//   } else {
//     res.status(404).send('Video not found');
//   }
// };


// const uploadVideoChunk = (req, res) => {
//   const { filename } = req.query;

//   if (!filename) {
//     return res.status(400).send('Missing filename in query parameters.');
//   }

//   const filePath = `./uploads/${filename}`;
//   const form = new formidable.IncomingForm();

//   form.onPart = (part) => {
//     if (!part.filename) {
//       form._handlePart(part);
//     } else {
//       const writeStream = fs.createWriteStream(filePath, { flags: 'a' });
//       part.pipe(writeStream);
//     }
//   };

//   form.on('end', () => {
//     console.log(`Recieved a chunk for ${filename}`);
//     res.status(200).send('Chunk received successfully');
//   });

//   form.on('error', (err) => {
//     console.error('Error recieving chunk', err);
//     res.status(500).send('Error receiving chunk');
//   });

//   form.parse(req)
// };

module.exports = {
  getVideo,
  uploadVideo,
}