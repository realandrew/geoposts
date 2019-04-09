const express = require("express");
var Twitter = require("twitter");

// Load environment variables
require('dotenv').config();

const app = express();

const port = 3000;
const appVersion = require('./package.json').version;

var twitter = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

app.use(express.static('public'));

var server = app.listen(port, () => console.log(`Created by Andrew Mitchell and Jacob Hackman.\nRunning Geoposts v` + appVersion + ` on port ${port} in ${app.settings.env} mode!`));
var io = require('socket.io')(server);

app.get('/', function(req, res) {
    res.sendFile("index.html");
});

// Old bounding box: {locations: "-84.217003,39.727303,-83.937769,39.863267"}
twitter.stream('statuses/filter', {locations: "-84.426367,39.585004,-83.957556,39.935918"},  function(stream) {
    stream.on('data', function(tweet) {
        if (tweet.coordinates != null) 
        {
            console.log(tweet.coordinates.coordinates);
            io.emit("new precise tweet", { for: 'everyone', data: tweet.coordinates.coordinates, url: "https://twitter.com/" + tweet.user.id_str + "/statuses/" + tweet.id_str, profileName: tweet.user.name, avatar: tweet.user.profile_image_url_https, tweetContent: tweet.text});
        } else {
            console.log(tweet.place.bounding_box.coordinates);
            io.emit("new loose tweet", { for: 'everyone', data: tweet.place.bounding_box.coordinates, url: "https://twitter.com/" + tweet.user.id_str + "/statuses/" + tweet.id_str, profileName: tweet.user.name, avatar: tweet.user.profile_image_url_https, tweetContent: tweet.text});
        }
    });
  
    stream.on('error', function(error) {
      console.log(error);
    });
});