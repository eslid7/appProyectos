/*****************************************************************************************************************************************************************
                                              Defino constantes necesarias para las rutas del proyecto
******************************************************************************************************************************************************************/
const router = require('express').Router();
const appProyectosController = require('../controllers/appProyectosController');
router.get('/', appProyectosController.list);
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

/*
router.post('/add', appProyectosController.save);
router.get('/update/:id', appProyectosController.edit);
router.get('/delete/:id', appProyectosController.delete);
router.get('/report', appProyectosController.report);
*/

module.exports = router;
