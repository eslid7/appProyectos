/*****************************************************************************************************************************************************************
                                              Defino variables y constantes necesarias para las rutas del proyecto
******************************************************************************************************************************************************************/
var passport = require('passport'),
    signupController = require('../controllers/signupController.js')

const router = require('express').Router();
const appProyectosController = require('../controllers/appProyectosController');
//router.get('/', appProyectosController.list);
/*****************************************************************************************************************************************************************
                                                                      Rutas de Proyectos
******************************************************************************************************************************************************************/
router.get('/updatePe/:id', appProyectosController.editP);
router.post('/updateP/:id', appProyectosController.updateP);
router.get('/deleteP/:id', appProyectosController.deleteP);
router.post('/insertP/', appProyectosController.insertP);
/*****************************************************************************************************************************************************************
                                                                      Rutas de categorias
******************************************************************************************************************************************************************/
router.get('/update/:id', appProyectosController.edit);
router.post('/updateC/:id', appProyectosController.updateC);
router.get('/delete/:id', appProyectosController.delete);
router.post('/insert/', appProyectosController.insert);
/*****************************************************************************************************************************************************************
                                                                      Rutas de recursos
******************************************************************************************************************************************************************/
router.post('/insertR/', appProyectosController.insertR);
router.get('/deleteR/:id', appProyectosController.deleteR);
router.get('/updateRe/:id', appProyectosController.editR);
router.post('/updateR/:id', appProyectosController.updateR);
/*****************************************************************************************************************************************************************
                                                                      Rutas de Tareas
******************************************************************************************************************************************************************/
router.post('/addTarea/', appProyectosController.insertTareas);
//router.get('/add/', appProyectosController.save);
//router.get('/addRecurso/', appProyectosController.addRecurso);


/*****************************************************************************************************************************************************************
                                                                      Rutas de Login
******************************************************************************************************************************************************************/
  var isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated())
      return next()
    req.flash('error', 'You have to be logged in to access the page.')
    res.redirect('/home')
  }

  router.get('/signup', signupController.show)
  router.post('/signup', signupController.signup)

  router.post('/login', passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/signup',
      failureFlash: true})
    );

  router.get('/home', function(req, res) {
    res.render('home')
  })

//  router.get('/dashboard', isAuthenticated, function(req, res) {
    //res.render('dashboard')
    router.get('/', isAuthenticated, appProyectosController.list);
  //})

  router.get('/logout', function(req, res) {
    req.logout()
    res.redirect('/home')
  })





/*
router.post('/add', appProyectosController.save);
router.get('/update/:id', appProyectosController.edit);
router.get('/delete/:id', appProyectosController.delete);
router.get('/report', appProyectosController.report);
*/

module.exports = router;
