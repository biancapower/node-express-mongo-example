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

/* STATIC FOLDER MIDDLEWARE */
// set static path
    // `__dirname` is the directory in which the currently executing script resides
        // using this with path.join is safer than the option that doesn't
app.use(express.static(path.join(__dirname, 'public')));

let people = [
    {
        name: "Bob",
        age: 50
    },
    {
        name: "Jane",
        age: 45
    },
    {
        name: "T",
        age: 30
    }
]

app.get('/', (req, res) => {
    res.json(people);
});

// process.env.PORT lets the port be set by Heroku
const port = process.env.PORT || 3033;
app.listen(port, () => {
  console.log(`Server running on ${port}`);
});