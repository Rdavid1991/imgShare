const passport = require('passport');

module.exports = {
    signup: ('/signup', (req, res, next) => {
        res.render('signup');
    }),

    signupCreate: ('/signup', passport.authenticate("local-signup", {
        successRedirect: '/profile',
        failureRedirect: '/signup',
        passReqToCallback: true
    })),

    signin: ('/signin', (req, res, next) => {
        res.render('signin');
    }),

    signinLogin: ('/signin', passport.authenticate('local-signin', {
        successRedirect: '/profile',
        failureRedirect: '/signin',
        passReqToCallback: true
    })),

    logout :('/logout', (req, res, next) => {
        req.logout();
        res.redirect('/');
    }),

    profile: ('/profile', isAuthenticate, (req, res, next) => {
        res.render('profile');
    })
};

function isAuthenticate(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}