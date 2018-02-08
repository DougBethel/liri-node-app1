
require("dotenv").config();
var keys = require("./key.js");
console.log('keys');
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');


var spotify = new Spotify (keys.spotify);
var client = new Twitter(keys.twitter);
var request = require('request');
var method = process.argv[2];
var type = process.argv[3];
var query = process.argv[4];

var fs = require('fs');


function  callMethod (method, query) {
switch (method) {
    case ("my-tweets"):tweetThis(); break;
    case ("spotify-this-song"):spotifyThis(type, query); break;
    case ("movie-this"):movieThis(); break;
    case ("do-what-it-says"): justDoIt(); break;
}
}

function tweetThis () {
    var params = { screen_name: 'dpb0808', count: 20 };

  client.get('statuses/user_timeline', params, function(error, tweets, response) {

    if (!error) {
      var data = []; //empty array to hold data
      for (var i = 0; i < tweets.length; i++) {
        data.push({
            'created at: ' : tweets[i].created_at,
            'Tweets: ' : tweets[i].text,
        });
      }
      console.log(tweets[i].text);
    }
  });
}

function spotifyThis (type, query) {

  spotify.search({ type, query}, function(err, data) {
    if (err) {
      console.log('Error occurred: ' + err);
      return;
    }
    console.log(data[type+"s"].items);
  });
};

function movieThis(movieName) {

  if (movieName === undefined) {
    movieName == 'Mr Nobody';
  }

  var queryURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=full&tomatoes=true&r=json";

  request(queryURL, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      var data = [];
      var jsonData = JSON.parse(body);

      data.push({
      'Title: ' : jsonData.Title,
      'Year: ' : jsonData.Year,
      'Rated: ' : jsonData.Rated,
      'IMDB Rating: ' : jsonData.imdbRating,
      'Country: ' : jsonData.Country,
      'Language: ' : jsonData.Language,
      'Plot: ' : jsonData.Plot,
      'Actors: ' : jsonData.Actors,
      'Rotten Tomatoes Rating: ' : jsonData.tomatoRating,
      'Rotton Tomatoes URL: ' : jsonData.tomatoURL,
  });
      console.log(data);
}
  });

}

 function justDoIt() {
  fs.readFile("random.txt", "utf8", function(error, data) {
    console.log(data);
    writeToLog(data);
    var dataArr = data.split(',')

    if (dataArr.length == 2) {
      pick(dataArr[0], dataArr[1]);
    } else if (dataArr.length == 1) {
      pick(dataArr[0]);
    }
callMethod(dataArr[0],dataArr[1]);
  });
}

callMethod(method, query);
