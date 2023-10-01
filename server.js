const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const cors = require("cors");
const videoRoutes = require("./routes/video.routes");


const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for JSON parsing
app.use(express.json());

// Middleware for URL-encoded form data parsing
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use(bodyParser.json());

// app.use(express.static('uploads'));

app.use('/', videoRoutes);



app.listen(PORT, () => {
  console.log(`App running on ${PORT}`)
});