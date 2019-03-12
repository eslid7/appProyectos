const router = require('express').Router();

const appProyectosController = require('../controllers/appProyectosController');

router.get('/', appProyectosController.list);
router.get('/update/:id', appProyectosController.edit);
router.post('/updateC/:id', appProyectosController.updateC);
router.get('/delete/:id', appProyectosController.delete);
router.get('/add/', appProyectosController.save);
router.post('/insert/', appProyectosController.insert);

/*
router.post('/add', appProyectosController.save);
router.get('/update/:id', appProyectosController.edit);
router.get('/delete/:id', appProyectosController.delete);
router.get('/report', appProyectosController.report);
*/

module.exports = router;
