const express = require('express');
const router = express.Router();
const trainersController = require('../controllers/trainers');

router.get('/', trainersController.getAll);
router.post('/', trainersController.createTrainer);
router.get('/:id', trainersController.getSingle);
router.put('/:id', trainersController.updateTrainer);
router.delete('/:id', trainersController.deleteTrainer);

module.exports = router;