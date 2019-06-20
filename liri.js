//read and set environment variables
require("dotenv").config();

//variables
var keys = require("./keys.js");
var Spotify = require('node-spotify-api'); //to use spotify api
var spotify = new Spotify(keys.spotify);
var axios = require("axios"); //to get information from APIs
var moment = require("moment"); //to display date
moment().format();
var fs = require("fs"); //to read random.txt and add to log.txt


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
    value = value.replace(/\s+/g, ''); //replace spaces with no spaces
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

//function for "spotify-this-song" - using spotify
function showSongInfo(value) {
    if (value === undefined) {
        value = "The Sign"; //default Song
    }
    spotify.search(
        {
            type: "track",
            query: value
        },
        function (err, data) {
            if (err) {
                console.log("Error occurred: " + err);
                return;
            }
            var songs = data.tracks.items;

            for (var i = 0; i < songs.length; i++) {
                console.log("===============SONG INFO===============");  
                console.log(i);
                console.log("Song name: " + songs[i].name);    
                console.log("Preview song: " + songs[i].preview_url);
                console.log("Album: " + songs[i].album.name);
                console.log("Artist(s): " + songs[i].artists[0].name);
                console.log("=======================================");

                fs.appendFileSync("log.txt", "===============SONG INFO===============\n");
                fs.appendFileSync("log.txt", i +"\n");
                fs.appendFileSync("log.txt", "song name: " + songs[i].name +"\n");
                fs.appendFileSync("log.txt", "preview song: " + songs[i].preview_url +"\n");
                fs.appendFileSync("log.txt", "album: " + songs[i].album.name + "\n");
                fs.appendFileSync("log.txt", "artist(s): " + songs[i].artists[0].name + "\n");
                fs.appendFileSync("log.txt", "======================================="+"\n");
             }
        }
    );
};

//function for "movie-this" - using omdb
function showMovieInfo(value) {
    value = value.replace(/\s+/g, '_'); //replace spaces with underscores
    if (value === undefined) {
        value = "Mr. Nobody"
        console.log("=======================================");
        console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
        console.log("It's on Netflix!");

        fs.appendFileSync("log.txt", "======================================="+"\n");
        fs.appendFileSync("log.txt", "If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/" +"\n");
        fs.appendFileSync("log.txt", "It's on Netflix!\n");
    }

    axios.get("http://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=trilogy").then(
        function (movies) {
            console.log("===============MOVIE INFO===============");  
            console.log("Title: " + movies.data.Title);
            console.log("Release Year: " + movies.data.Year);
            console.log("IMDB Rating: " + movies.data.imdbRating);
            console.log("Rotten Tomatoes Rating: " + movies.data.Ratings[1].Value);
            console.log("Country of Production: " + movies.data.Country);
            console.log("Language: " + movies.data.Language);
            console.log("Plot: " + movies.data.Plot);
            console.log("Actors: " + movies.data.Actors);
            console.log("========================================");
            
            fs.appendFileSync("log.txt", "===============MOVIE INFO===============\n");
            fs.appendFileSync("log.txt", "Title: " + movies.data.Title + "\n");
            fs.appendFileSync("log.txt", "Release Year: " + movies.data.Year + "\n");
            fs.appendFileSync("log.txt", "IMDB Rating: " + movies.data.imdbRating + "\n");
            fs.appendFileSync("log.txt", "Rotten Tomatoes Rating: " + movies.data.Ratings[1].Value + "\n");
            fs.appendFileSync("log.txt", "Country of Production: " + movies.data.Country + "\n");
            fs.appendFileSync("log.txt", "Language: " + movies.data.Language + "\n");
            fs.appendFileSync("log.txt", "Plot: " + movies.data.Plot + "\n");
            fs.appendFileSync("log.txt", "Actors: " + movies.data.Actors + "\n");
            fs.appendFileSync("log.txt", "========================================"+"\n");
        }
    )
    .catch(function (error){
        console.log('Error occurred.');
    });
}

//function for "do-what-it-says" - using fs 
function showRandom(){
	fs.readFile('random.txt', 'utf8', function(err, data){
		if (err){ 
			return console.log(err);
		}
        var dataArr = data.split(',');
        UserInputs(dataArr[0], dataArr[1]);
	});
}
