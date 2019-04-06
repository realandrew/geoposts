const express = require('express');
const app = express();

const port = 3000;
const appVersion = require('./package.json').version;

app.get('/', function(req, res) {
    res.send("Hello World!");
});

app.listen(port, () => console.log(`Created by Andrew Mitchell, Jacob Hackman, Kainan Woodard.\nRunning Geoposts v` + appVersion + ` on port ${port} in ${app.settings.env} mode!`));