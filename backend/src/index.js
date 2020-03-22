const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Extracts http server from Express
const server = require("http").Server(app);
// Listen the WS protocol => to understand real time requests,
// in addition to the HTTP protocol 
const io = require("socket.io")(server);

// String of DB connection
const url = "mongodb://localhost:27017/omnistack-february";

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

mongoose.connect(url, options);

// Some events for Mongo to stay listening and report if something different happened

mongoose.connection.on("connected", () => {
  console.log("Application connected on database =D");
});

mongoose.connection.on("disconnected", () => {
  console.log("Application disconnected from database.");
});

mongoose.connection.on("error", err => {
  console.log(`Error on connection with database: ${err}`);
});

// Middleware
app.use((req, res, next) => {
  req.io = io;

  return next();
});

// To use JSON in request
app.use(express.json());
app.use(cors());
app.use(require("./routes/routes"));

const port = 3030;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
