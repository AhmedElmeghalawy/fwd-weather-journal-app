const express = require("express");
const app = express();

const bodyParser = require("body-parser");

// Setup empty JS object to act as endpoint for all routes
projectData = {};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

app.get("/getData", function (req, res) {
  res.send(projectData).status(200);
});


app.post("/postData", function (req, res) {

  projectData = {
    zipCode: req.body.zipCode,
    fealings: req.body.fealings,

    countryCode: req.body.countryCode,

    cityName: req.body.cityName,
    temp: req.body.temp,

    date: req.body.date,
  };
  console.log("postData!");
  console.log(req.body);
  res.send(projectData).status(200);
});


// Setup Server
let port = 80;
const server = app.listen(port, () => {
  listening();
});

function listening() {
  console.log("server running");
  console.log(`running on localhost: ${port}`);
}

