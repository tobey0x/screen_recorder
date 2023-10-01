const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

const videoRoutes = require("./routes/video.routes")
// const errorHandler = require("./middleware")


app.use(cors())
app.use('/', videoRoutes);



app.listen(PORT, () => {
  console.log(`App running on ${PORT}`)
});