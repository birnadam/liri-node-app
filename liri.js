//read and set environment variables
require("dotenv").config();

//variables
var keys = require("./keys.js");
var Spotify = require('node-spotify-api'); //to use spotify api
var spotify = new Spotify(keys.spotify);
var axios = require("axios"); //to get information from APIs
var moment = require("moment"); //to display date
moment().format();
var fs = require("fs"); //to read random.txt


//varriables to get user's input
var option = process.argv[2]; 
var value = process.argv[3];

UserInputs(option, value);

//available functions
function UserInputs (option, value){
    switch (option) {
    case 'concert-this':
        showConcerts(value);
        break;
    case 'spotify-this-song':
        showSongInfo(value);
        break;
    case 'movie-this':
        showMovieInfo(value);
        break;
    case 'do-what-it-says':
        showRandom();
        break;
    default: 
        console.log("Invalid Option. Please type any of the following options: \nconcert-this \nspotify-this-song \nmovie-this \ndo-what-it-says")
    }
}

//function for "concert-this" - using bands in town
function showConcerts(value){
    axios.get("https://rest.bandsintown.com/artists/" + value + "/events?app_id=codingbootcamp")
    .then(function(concerts) {    
        for (var i = 0; i < concerts.data.length; i++) {  

            console.log("===============EVENT INFO===============");  
            console.log(i);
            console.log("Name of the Venue: " + concerts.data[i].venue.name);
            console.log("Venue Location: " +  concerts.data[i].venue.city);
            console.log("Date of the Event: " +  moment(concerts.data[i].datetime).format('LL'));
            console.log("========================================");

            //append to log.txt 
            fs.appendFileSync("log.txt", "===============EVENT INFO===============\n");
            fs.appendFileSync("log.txt", i+"\n");
            fs.appendFileSync("log.txt", "Name of the Venue: " + concerts.data[i].venue.name+"\n");
            fs.appendFileSync("log.txt", "Venue Location: " +  concerts.data[i].venue.city+"\n");
            fs.appendFileSync("log.txt", "Date of the Event: " +  moment(concerts.data[i].datetime).format('LL'));
            fs.appendFileSync("log.txt", "========================================"+"\n");
        }
    })
    .catch(function (error){
        console.log('Error occurred.');
    });
}