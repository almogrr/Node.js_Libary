const express = require('express');
const bodyParser = require('body-parser');
const dbConfig = require('./database.config');
const mongoose = require('mongoose');
const cors = require('cors');
const loggingMiddleware = require('./middleware/logging.middleware');
require('dotenv').config();

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Successfully connected to the database");
    }).catch(err => {
        console.log('Could not connect to the database. Exiting now...', err);
        process.exit();
    });

// create express app
const app = express();
app.use(cors());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// use logging middleware
app.use(loggingMiddleware);

// define a simple route
app.get('/', (req, res) => {
    res.json({ "message": "Welcome to the application." });
});

// require and use routes
require('./routes/book.routes')(app);
require('./routes/loan.routes')(app);
require('./routes/user.routes')(app);

// listen for requests
const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
