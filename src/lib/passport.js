const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


const pool = require('../database');
const helpers = require('../lib/helpers');


passport.use('local.login', new LocalStrategy ({
    usernameField: 'usuario',
    passwordField: 'pass',
    passReqToCallback: true
}, async (req, usuario, pass, done)=>{
    const { permisos } = req.body;
    const rows = await pool.query('SELECT * FROM users WHERE username = ?', [usuario]);
    if(rows.length > 0) {
        const user = rows[0];
        const validPass = await helpers.login(pass, user.password)
        console.log(pass + " " + user.password)
        if(validPass){
            done(null, user, req.flash('success', "Bienvenido " + user.username));

        } else {
            done(null, false, req.flash('message','Contraseña incorrecta'));
            } 
        } else {
            return done(null, false, req.flash('message',"Usuario incorrecto"));
    }
}));

passport.use('local.register', new LocalStrategy({
    usernameField: 'usuario',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, usuario, password, done)=>{
    const { permisos } = req.body;
     const newUser = {
        username: usuario,
        password,
        permisos
   };
    newUser.password = await helpers.encryptPassword(password);

    const result = await pool.query('INSERT INTO users SET ?', [newUser]);
    newUser.id = result.insertId;
    return done(null, newUser);
}));

passport.serializeUser((user, done)=>{
    done(null, user.id);
});

passport.deserializeUser(async (id, done) =>{
    const rows = await pool.query("SELECT * FROM users Where id = ?", [id]);
    done(null, rows[0]);
});