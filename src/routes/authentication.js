const express = require('express');
const router = express.Router();

const passport = require('passport');
const { isLoggedIn } = require('../lib/secauth');

router.get('/register', (req, res)=>{
    res.render('auth/register');
});

router.post('/register',  passport.authenticate('local.register', {
        successRedirect: '/pantones',
        failureRedirect: '/register',
        failureFlash: true

}));

router.get('/login', (req, res)=>{
    res.render('auth/login');
});

router.post('/login', (req, res) =>{
    
    passport.authenticate('local.login', {
        successRedirect: '/pantones',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res);
});

router.get('/logout', (req, res) =>{
    req.logOut();
    res.redirect('/login');
});

module.exports = router;