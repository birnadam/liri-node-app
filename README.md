# liri-node-app

## What it is
LIRI is a CLI app that stands for *Language Interpretation and Recognition Interface*.
<br>It is an app that takes in the user's paramters and provides data based off of those inputs. 
<br>This app has four functions: 
1. **concert-this** - provides users with concert details for a specified artist/band
2. **spotify-this-song** - provides users with details on a specifiedic song
3. **movie-this** - provides users with details of the specified movie
4. **do-what-it-says** - performs exactly what the random.txt says 
<br>(ex. if the text has the line 'spotify-this-song,"I Want it That Way"', it would perform that task 
<br>provide the same details as if you typed that into the command line directly)
## How it was made
LIRI was created using **Node, Fs, Axios, Moment, and DotEnv**. 
<br>It also pulls data from **Spotify API, OMDB API, and Bands in Town API**.

The application uses Fs to read/edit text files; specifically for me to use "*do-what-it-says*" and to log results.
<br>Axios is used to retrieve data from APIs. Moment is used to edit/display date & time.
<br>And I use DotEnv so that I can store our configuration seperate from my actual code.

### How each API is used
- *concert-this* requires Bands in Town API
- *spotify-this-song* requires Spotify API
- *movie this* requires OMDB API

## How it works
First you need to setup your CLI app:
1. Download the files here in this repository
2. Pull up your console in the downloaded folder and type "npm init -y" to intialize your package.json
3. Type in "npm i fs", "npm i axios", "npm i moment", and "npm i dotenv" to install all the proper modules
4. Go to https://developer.spotify.com/my-applications/#!/ and go through the steps to get a key
5. Lastly, create an .env file and add the following lines to it (replacing the spotify key with your own)
> \# Spotify API keys
<br>SPOTIFY_ID=your-spotify-id
<br>SPOTIFY_SECRET=your-spotify-secret

Once your app is all setup you simply type in "node liri.js x y" and it will perform the action
- x - being the command you want to do.
- y - being the specified parameter.

x can be any of the following options: concert-this, spotify-this-song, movie-this, do-what-it-says

y can be either one word, or multiple words in between quotation marks like "porter robinson"

## Screenshots
Here is how concert-this looks:
<br>![concert-this image](https://github.com/birnapwnsu/liri-node-app/blob/master/screenshots/concert-this-demo.JPG?raw=true)

Here is how spotify-this-song looks:
<br>![spotify-this-song image](https://github.com/birnapwnsu/liri-node-app/blob/master/screenshots/spotify-this-song-demo.JPG?raw=true)

Here is how it looks when the parameter is undefined:
<br>![spotify-this-song undefined image](https://github.com/birnapwnsu/liri-node-app/blob/master/screenshots/spotify-this-song-undefined-demo.JPG?raw=true)

Here is how movie-this looks:
<br>![movie-this image](https://github.com/birnapwnsu/liri-node-app/blob/master/screenshots/movie-this-demo.JPG?raw=true)

Here is how it looks when the parameter is undefined:
<br>![movie-this undefined image](https://github.com/birnapwnsu/liri-node-app/blob/master/screenshots/movie-this-undefined-demo.JPG?raw=true)

Here is how do-what-it-says looks: 
<br>![do-what-it-says 1 image](https://github.com/birnapwnsu/liri-node-app/blob/master/screenshots/do-what-it-says-demo1-2outof2.JPG?raw=true)
<br>![do-what-it-says 2 image](https://github.com/birnapwnsu/liri-node-app/blob/master/screenshots/do-what-it-says-demo1-1outof2.JPG?raw=true)
