const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const expressSession = require('express-session');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(expressSession({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

// MongoDB connection
mongoose.connect(process.env.URI)
    .then(function() {
        console.log('Server is connected to the Database');
        
        // Initialize Passport after mongoose connection
        app.use(passport.initialize());
        passport.use(User.createStrategy());
        passport.serializeUser(User.serializeUser());
        passport.deserializeUser(User.deserializeUser());
        
    })
    .catch((err) => {
        console.log('Error connecting to the database:', err);
    });

app.use('', require('./routes/routes'));

const User = require('./models/user');

// Root route
app.get('/', function(req, res) {
    res.render('index');
});

app.listen(PORT, function() {
    console.log(`Server Running on PORT : ${PORT}`);
});
