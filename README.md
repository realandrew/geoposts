# GeoPosts

## About
GeoPosts is a project created for the _Make IT Wright Hackathon 2019_ at Wright State University by Andrew Mitchell and Jacob Hackman. The last commit during the hackathon was [0f9450cf5843f706777d85a32f567c0141846a7b](https://github.com/realandrew/geoposts/commit/0f9450cf5843f706777d85a32f567c0141846a7b).

The project is a map of the location of social media posts around the Wright State area in real-time. Currently only Twitter is supported as most other social media APIs have restrictions that prevent us from accessing the needed data (e.g Facebook, Instagram) or are not real-time (e.g Flickr).

## Server setup
Make sure you have [Node](https://nodejs.org/en/) version 10+ installed.

Open a terminal to the project directory and type `npm install` to download the required npm modules.

You will need access to the Twitter API ([i.e a Twitter developer account](https://developer.twitter.com/content/developer-twitter/en.html)).
Once you get your API keys make a file named `.env` in the root project folder containing your Twitter API keys in the following format:
```
TWITTER_CONSUMER_KEY="your_twitter_consumer_key_here"
TWITTER_CONSUMER_SECRET="your_twitter_consumer_secret_here"
TWITTER_ACCESS_TOKEN_KEY="your_twitter_access_token_key_here"
TWITTER_ACCESS_TOKEN_SECRET="your_twitter_access_token_secret_here"
```

## How to run the server
Type `npm start` to run using nodemon (automatically restarts the server upon changes), or `node index.js` to run without nodemon. (If you're not sure which to run: `npm start` is recommended for development, and `node index.js` is recommended for production.)

## Libraries used
### In Project
- [Express](https://www.npmjs.com/package/express)
- [Socket.io](https://socket.io/) ([npm pkg](https://www.npmjs.com/package/socket.io))
- [Twitter API (NodeJS)](https://www.npmjs.com/package/twitter)
- [OpenLayers](https://openlayers.org/) ([npm pkg](https://www.npmjs.com/package/ol))
- [dotenv](https://www.npmjs.com/package/dotenv)
### For development
- [Nodemon](https://www.npmjs.com/package/nodemon)

## Authors
* Andrew Mitchell
* Jacob Hackman

## License
This software is licensed under the GNU General Public License Version 3 (GPL-3.0).
This license can be read in the included `LICENSE.txt` file or at the [GNU.org link](https://www.gnu.org/licenses/gpl-3.0-standalone.html).