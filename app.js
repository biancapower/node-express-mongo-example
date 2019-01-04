const express = require('express');
const bodyParser = require('body-parser');
// simplifies file paths
    // core module, so doesn't need to be npm installed
const path = require('path');

const app = express();

// set view engine
app.set('view engine', 'ejs');
// specify views folder
app.set('views', path.join(__dirname, 'views'));

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

app.get('/', (req, res) => {
    res.render('index', {
        message: "Helloooooo"
    });
});

// process.env.PORT lets the port be set by Heroku
const port = process.env.PORT || 3033;
app.listen(port, () => {
  console.log(`Server running on ${port}`);
});