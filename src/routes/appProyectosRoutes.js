const router = require('express').Router();

const appProyectosController = require('../controllers/appProyectosController');

router.get('/', appProyectosController.list);

//Métodos Categorías
router.get('/update/:id', appProyectosController.edit);
router.post('/updateC/:id', appProyectosController.updateC);
router.get('/delete/:id', appProyectosController.delete);
router.get('/add/', appProyectosController.save);
router.post('/insert/', appProyectosController.insert);

//Métodos Recursos
router.get('/addRecurso/', appProyectosController.addRecurso);
router.post('/insertR/', appProyectosController.insertR);
router.get('/deleteR/:id', appProyectosController.deleteR);

//Métodos tareas
router.post('/addTarea/', appProyectosController.insertTareas);

/*
router.post('/add', appProyectosController.save);
router.get('/update/:id', appProyectosController.edit);
router.get('/delete/:id', appProyectosController.delete);
router.get('/report', appProyectosController.report);
*/

module.exports = router;
