'use strict';

const express = require('express');
//const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();

const { getHomePage } = require('./routes/index');
const { addMemberPage, addMember, deleteMember, editMember, editMemberPage } = require('./routes/member');
const port = 80;

// create connection to local database
const db = mysql.createConnection({
    host: 'ec2-18-224-53-63.us-east-2.compute.amazonaws.com',
    user: 'clouduser',
    password: 'password',
    database: 'clouddb'
});

//// create connection to cloud database
//const clouddb = mysql.createConnection({
//    host: 'localhost',
//    user: 'root',
//    password: '12345',
//    database: 'localdb'
//});

// connect to database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});
global.db = db;

//// connect to Cloud database
//clouddb.connect((err) => {
//    if (err) {
//        throw err;
//    }
//    console.log('Connected to Cloud database');
//});
//global.clouddb = clouddb;

// configure middleware
app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder
//app.use(fileUpload());

// routes for the app
app.get('/', getHomePage);
app.get('/add', addMemberPage);
app.get('/edit/:MemberId', editMemberPage);
app.get('/delete/:MemberId', deleteMember);
//app.get('/viewcloud', getViewCloud);
//app.get('/viewpremise', getViewPremise);
app.post('/add', addMember);
app.post('/edit/:MemberId', editMember);

// set the app to listen on the port
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});