const express = require('express'),
      path = require('path'),
      Sequelize = require('sequelize');


const app = express();

// importing routes
const appProyectosRoutes = require('./routes/appProyectosRoutes');

// settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middlewares

app.use(express.urlencoded({extended: false}));

// routes
app.use('/', appProyectosRoutes);

// static files
app.use(express.static(path.join(__dirname, 'public')));

// starting the server
app.listen(app.get('port'), () => {
  console.log(`server on port ${app.get('port')}`);
});
