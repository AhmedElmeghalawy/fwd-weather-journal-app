const express = require('express');
const app = express();

const bodyParser = require('body-parser')


// Setup empty JS object to act as endpoint for all routes
projectData = {

};

// Require Express to run server and routes

// Start up an instance of app

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// app.get('/', function (req, res) {
//     res.send('hello world');
//   })

// Setup Server
let port = 8080;
const server = app.listen(port, ()=>{listening()})

function listening(){
    console.log("server running"); 
    console.log(`running on localhost: ${port}`);
}





//https://review.udacity.com/#!/rubrics/4671/view