const express = require('express');
const bodyParser = require('body-parser');
// simplifies file paths
    // core module, so doesn't need to be npm installed
const path = require('path');

const app = express();

app.get('/', (req, res) => {
    res.send('hello world');
});

// process.env.PORT lets the port be set by Heroku
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on ${port}`);
});