require("dotenv").config();

var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);

var axios = require("axios");

var command = process.argv[2];

switch (command) {
    case "concert-this":
        findConcert();
        break;
    case "spotify-this-song":
        break;
    case "movie-this":
        break;
    case "do-what-it-says":
        break;
    default:
        console.log("Please enter a valid command.");
        break;
}

function findConcert() {
    var artist = process.argv[3];
    
}