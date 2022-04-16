const express = require('express');
const mongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const routes = require('./app/routes/index');
const db = require('./config/db');

const app = express();
const port = 8000;

app.use(bodyParser.json());
mongoClient.connect(db.url, (err, database) => {
    if (err) { return console.log(err) };
    routes(app, database);
    app.listen(port, () => {
        console.log(`We are live on ${port}!`);
    });
});

