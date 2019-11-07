require("dotenv").config();

var keys = require("./keys.js");

var fs = require("fs");

var Spotify = require("node-spotify-api");

var spotify = new Spotify(keys.spotify);

var moment = require("moment");

var axios = require("axios");

runCommand(process.argv[2], process.argv[3]);

function runCommand(command, thing) {

switch (command) {
    case "concert-this":
        findConcert(thing);
        break;
    case "spotify-this-song":
        findSong(thing);
        break;
    case "movie-this":
        findMovie(thing);
        break;
    case "do-what-it-says":
        takeOrder();
        break;
    default:
        console.log("Please enter a valid command.");
        break;
}

}

function findConcert(artist) {

    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(
        function(response) {
            for (i = 0; i < response.data.length; i++) {
                console.log("Venue: " + response.data[i].venue.name);
                console.log("Venue Location: " + response.data[i].venue.country + ", " + response.data[i].venue.city);
                var date = response.data[i].datetime;
                date = moment(date).format("MM/DD/YYYY");
                console.log("Date: " + date);
                console.log("\n----------------------\n");
            };
        }
    ).catch(
        function(error) {
            console.log(error.message);
        }
    );
}

function findSong(song) {

    if (!song) {
        song = "The Sign";
    }

    spotify.search({ type: "track", query: song, limit: 10 }, function(err, data) {
        if (err) {
            return console.log(err);
        }

        

        for(i=0; i < data.tracks.items.length; i++) {
            console.log("Song: " + data.tracks.items[i].name);
            for(j=0; j < data.tracks.items[i].artists.length; j++) {
                console.log("Artist: " + data.tracks.items[i].artists[j].name);
            }
            console.log("Preview URL: " + data.tracks.items[i].preview_url);
            console.log("Album: " + data.tracks.items[i].album.name);
            console.log("\n-------------------------------\n");
        }

    });
}

function findMovie(movie) {

    if (!movie) {
        movie = "Mr. Nobody";
    }

    axios.get("http://www.omdbapi.com/?apikey=trilogy&t=" + movie).then(function(response) {
        console.log("---------------------------------");
        console.log("Title: " + response.data.Title);
        console.log("Year of release: " + response.data.Year);
        console.log("IMDB rating: " + response.data.imdbRating);
        for (i = 0; i < response.data.Ratings.length; i++) {
            if(response.data.Ratings[i].Source === "Rotten Tomatoes") {
                console.log("Rotten Tomatoes rating: " + response.data.Ratings[i].Value);
            }
        }
        console.log("Country: " + response.data.Country);
        console.log("Language: " + response.data.Language);
        console.log("Plot: " + response.data.Plot);
        console.log("Actors: " + response.data.Actors);
    });
}

function takeOrder() {
    fs.readFile("random.txt", "utf8", function(err, data) {
        if (err) {
            return console.log(err);
        }

        console.log(data);

        var dataArray = data.split(",");
        console.log(dataArray);

        runCommand(dataArray[0], dataArray[1]);
    });
}