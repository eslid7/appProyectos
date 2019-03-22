const express = require('express'),
      path = require('path'),
      Sequelize = require('sequelize');


const app = express();

var setupPassport = require('./setupPassport'),
flash = require('connect-flash'),
session = require('express-session'),
bodyParser = require('body-parser'),
cookieParser = require('cookie-parser'),
jsonParser = bodyParser.json()



// importing routes
const appProyectosRoutes = require('./routes/appProyectosRoutes');

// settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middlewares

app.use(express.urlencoded({extended: false}));

app.use(cookieParser())
app.use(session({ secret: '4564f6s4fdsfdfd', resave: false, saveUninitialized: false }))

app.use(flash())
app.use(function(req, res, next) {
    res.locals.errorMessage = req.flash('error')
    next()
});

app.use(jsonParser)
app.use(bodyParser.urlencoded({
  extended: true
}))

setupPassport(app)


// routes
app.use('/', appProyectosRoutes);

// static files
app.use(express.static(path.join(__dirname, 'public')));

// starting the server
app.listen(app.get('port'), () => {
  console.log(`server on port ${app.get('port')}`);
});
