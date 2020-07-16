const path = require('path')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
app.use(cors())
app.use(express.static('dist'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

// Set up dotenv to hide API Keys and Usernames
require('dotenv').config();

// Set object to list of keys
const apiKeys = {
    weatherbitKey : process.env.WEATHERBIT_API_KEY,
    pixabayKey : process.env.PIXABAY_API_KEY,
    geoapiName : process.env.GEONAMES_API_USERNAME
}

// app.post('/apiInfo', function (req, res) {
//     let 
// })




// Create path for API information retrieval
app.get('/apiKeys', function (req, res) {
    res.send(apiKeys);
});

// designates what port the app will listen to for incoming requests
app.listen(3030, function () {
    console.log('Example app listening on port 3030!')
})