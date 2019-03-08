const router = require('express').Router();

const appProyectosController = require('../controllers/appProyectosController');

router.get('/', appProyectosController.list);
/*
router.post('/add', customerController.save);
router.get('/update/:id', customerController.edit);
router.post('/update/:id', customerController.update);
router.get('/delete/:id', customerController.delete);
router.get('/report', customerController.report);
*/

module.exports = router;
