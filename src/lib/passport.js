const passport = require("passport");
const { Strategy } = require("passport-local");
const { encryptPassword, matchPassword } = require("./helpers");
const db = require('../models/index');

passport.use('local.signin', new Strategy({
    usernameField: 'username',
    passwordField: 'passwrd',
    passReqToCallback: true
}, async (request, username, passwrd, done) => {
    db.User.findOne({
        where: { username: username }
    }).then(user => {
        if (user === null) {
            return done(null, false, request.flash('message', 'The username or password does not exist.'));
        } else {
            matchPassword(passwrd, user.passwrd).then(validPassword => {
                if (validPassword) {
                    done(null, user, request.flash('success', `Welcome ${user.fullname}.`));
                } else {
                    done(null, false, request.flash('message', 'The username or password does not exist.'));
                }
            });
        }
    });
}));

passport.use('local.signup', new Strategy({
    usernameField: 'username',
    passwordField: 'passwrd',
    passReqToCallback: true
}, async (request, username, passwrd, done) => {
    const { fullname } = request.body;
    const newUser = { username, passwrd, fullname }
    newUser.passwrd = await encryptPassword(passwrd);
    const user = await db.User.create(newUser);
    newUser.id = user.id;
    return done(null, newUser);
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    db.User.findByPk(id).then(user => {
        done(null, user);
    });
})