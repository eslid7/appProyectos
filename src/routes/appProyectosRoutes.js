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
router.get('/createPe/', appProyectosController.createPe);
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
router.get('/getCategoriesFromFile/', appProyectosController.getCategoriesFromFile);

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
router.post('/addTarea/:idProyecto', appProyectosController.insertTareas);
router.post('/loadProyecto/', appProyectosController.listBodyTareas);
router.get('/addcat/:id', appProyectosController.listCategoriasAll);
router.get('/addcatProyecto/:id/:idProyecto', appProyectosController.insertCatProyecto);
router.get('/addRecursoP/:id', appProyectosController.listRecursosAll);
router.get('/addRecProyecto/:id/:idProyecto', appProyectosController.insertRecProyecto);
router.get('/deleteCatP/:id/:idProyecto', appProyectosController.deleteCatP);
router.get('/deleteRecP/:id/:idProyecto', appProyectosController.deleteRecP);


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

  router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err) }
    if (!user) {
      // *** Display message without using flash option
      // re-render the login form with a message
      var mensaje = [info.message];
      return res.render('home', { errorMessage: mensaje  })
    }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.redirect('/');
    });
  })(req, res, next);
});

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
