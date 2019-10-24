const passport = require('passport');

module.exports = {
    signup: (req, res, next) => {
        res.render('signup');
    },

    signupCreate: passport.authenticate("local-signup", {
        successRedirect: '/profile',
        failureRedirect: '/signup',
        passReqToCallback: true
    }),

    signin: (req, res, next) => {
        res.render('signin');
    },

    signinLogin: passport.authenticate('local-signin', {
        successRedirect: '/profile',
        failureRedirect: '/signin',
        passReqToCallback: true
    }),

    logout: (req, res, next) => {
        req.logout();
        res.redirect('/');
    },

    profile: (req, res, next) => {
        res.render('index');
    }
};