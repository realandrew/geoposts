const express = require("express");
const path = require("path");

const app = express();

const port = 3000;
const appVersion = require('./package.json').version;

app.use(express.static('public'));

app.get('/', function(req, res) {
    res.sendFile("index.html")
});

app.listen(port, () => console.log(`Created by Andrew Mitchell, Jacob Hackman, Kainan Woodard.\nRunning Geoposts v` + appVersion + ` on port ${port} in ${app.settings.env} mode!`));