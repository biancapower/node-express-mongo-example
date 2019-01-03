const express = require('express');
const bodyParser = require('body-parser');
// simplifies file paths
    // core module, so doesn't need to be npm installed
const path = require('path');

const app = express();

/* EXAMPLE OF MIDDLEWARE
// custom middleware
const logger = ((req, res, next) => {
    console.log('logging...');
    next();
})

// allows us to use the custom middleware
app.use(logger);
*/

/* BODY PARSER MIDDLEWARE */
// handle parsing json content
app.use(bodyParser.json());
// handle parsing urlencoded content [extended explained here: https://www.npmjs.com/package/body-parser#extended]
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => {
    res.send('hello world');
});

// process.env.PORT lets the port be set by Heroku
const port = process.env.PORT || 3033;
app.listen(port, () => {
  console.log(`Server running on ${port}`);
});