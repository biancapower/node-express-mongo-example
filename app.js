const express = require('express');
const bodyParser = require('body-parser');
// simplifies file paths
    // core module, so doesn't need to be npm installed
const path = require('path');
const expressValidator = require('express-validator');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/example-customerapp');

const db = mongoose.connection;

// check db connection
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// check for db errors
db.on('error', (err) => {
    console.log(err);
});

const app = express();

// set view engine
app.set('view engine', 'ejs');
// specify views folder
app.set('views', path.join(__dirname, 'views'));

// express validator middleware
app.use(expressValidator());

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

// global vars
app.use((req, res, next) => {
    res.locals.errors = null;
    next();
});

const users = [
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
    res.render('index', {
        message: "Helloooooo",
        users: users
    });
});

// handle form submission
app.post('/users/add', (req, res) => {

    req.checkBody('first_name', 'First name is required').notEmpty();
    req.checkBody('age', 'Age must be an integer').isInt();

    const errors = req.validationErrors();

    if(errors) {
        res.render('index', {
            message: "Helloooooo",
            users: users,
            errors: errors // errors needs to be set as global var (done above)
        });
        console.log('ERRORS');
    } else {
        const newUser = {
            first_name: req.body.first_name,
            age: req.body.age
        }
        console.log('SUCCESS');
    }
});

// process.env.PORT lets the port be set by Heroku
const port = process.env.PORT || 3033;
app.listen(port, () => {
  console.log(`Server running on ${port}`);
});