const passport = require("passport");
const { Strategy } = require("passport-local");
const { encryptPassword, matchPassword } = require("./helpers");
const pool = require("../database");

passport.use('local.signin', new Strategy({
    usernameField: 'username',
    passwordField: 'passwrd',
    passReqToCallback: true
}, async (request, username, passwrd, done) => {
    const rows = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    if (rows.length > 0) {
        const user = rows[0];
        const validPassword = await matchPassword(passwrd, user.passwrd);
        if (validPassword) {
            done(null, user, request.flash('success', `Welcome ${user.fullname}.`));
        } else {
            done(null, false, request.flash('message', 'The username or password does not exist.'));
        }
    } else {
        return done(null, false, request.flash('message', 'The username or password does not exist.'));
    }
}));

passport.use('local.signup', new Strategy({
    usernameField: 'username',
    passwordField: 'passwrd',
    passReqToCallback: true
}, async (request, username, passwrd, done) => {
    const { fullname } = request.body;
    const newUser = {
        username,
        passwrd,
        fullname
    }
    newUser.passwrd = await encryptPassword(passwrd);
    const result = await pool.query('INSERT INTO users SET ?', [newUser]);
    newUser.id = result.insertId;
    return done(null, newUser);
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const rows = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
    done(null, rows[0]);
})