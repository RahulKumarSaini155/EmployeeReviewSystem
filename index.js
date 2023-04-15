const dotEnv  = require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
const db = require('./config/mongoose');
const expressLayout = require('express-ejs-layouts');

// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

const MongoStore = require('connect-mongo')(session);

app.use(express.urlencoded());

// ejs engine
app.set('view engine', 'ejs');
app.set('views', './views');

// mongo store is used to store the session cookie in the db
app.use(session({
    name: 'employee-review-system',
    // Todo change the secret before deployment in production mode
    // secret: env.session_cookie_key,
    secret: 'ejMyY2WKMrryvBCQ8v8YGIT8x0XyA1KZ',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: new MongoStore(
        {
            mongooseConnection: db,
            autoRemove: 'disabled'
        },
        function(err){
            console.log(err || 'connect-mongodb setup ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);


// layout
app.use(expressLayout);
// extract style and script from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// set static files
app.use(express.static('./assets'));

app.use('/', require('./routes'));

app.listen(PORT, (err)=>{
    if(err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log('Server is connected on PORT: ', PORT);
});
