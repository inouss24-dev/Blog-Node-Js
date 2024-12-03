const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/user');

router.get('/create', function(req, res) {
    res.render('create');
});

router.get('/signup', function(req, res) {
    res.render('signup');
});

router.post('/signup', async function(req, res) {
    try {
        const userExist = await User.findOne({ username : req.body.username, email: req.body.email });

        if (userExist) {
            console.log('User already registered');
            return res.render('login');
        }

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
        });

        User.register(newUser, req.body.password, function(err, user) {
            if (err) {
                console.log('Error', err);
                return res.redirect('/signup');
            }

            passport.authenticate('local')(req, res, function() {
                console.log('User created');
                res.redirect('login');
            });
        });
    } catch (error) {
        console.log('Error', error);
        res.redirect('/signup');
    }
});

router.get('/login', function(req, res) {
    res.render('login');
});

router.get('/forgot', function(req, res) {
    res.render('forgot');
});

router.get('/reset', function(req, res) {
    res.render('reset');
});

module.exports = router;
