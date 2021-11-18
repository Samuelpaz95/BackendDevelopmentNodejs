const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const morgan = require("morgan");
const flash = require('connect-flash');
const session = require('express-session');
const SessionStore = require('express-session-sequelize')(session.Store);
const passport = require('passport');

const { sequelize } = require('./models/index');
const sequelizeSessionStore = new SessionStore({db: sequelize});

// initializations
const app = express();
require('./lib/passport');

// settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs');

// Middlewares 
app.use(session({
    secret: "ThisIsMySecretKey",
    resave: false,
    saveUninitialized: false,
    store: sequelizeSessionStore
}));
app.use(flash());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session())

// global variables
app.use((request, response, next) => {
    app.locals.success = request.flash('success');
    app.locals.message = request.flash('message');
    app.locals.user = request.user;
    next();
});

// routes
app.use(require('./routes/index'));
app.use(require('./routes/authentication'));
app.use('/links', require('./routes/links'));

// public
app.use(express.static(path.join(__dirname, 'public')));

// Starting server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});


