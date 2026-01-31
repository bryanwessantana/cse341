const express = require('express');
const router = express.Router();
const trainersController = require('../controllers/trainers');
const validation = require('../middleware/validate');
const { requiresAuth } = require('express-openid-connect');

router.get('/', trainersController.getAll);
router.get('/:id', trainersController.getSingle);

router.post('/', requiresAuth(), validation.saveTrainer, trainersController.createTrainer);
router.put('/:id', requiresAuth(), validation.saveTrainer, trainersController.updateTrainer);
router.delete('/:id', requiresAuth(), trainersController.deleteTrainer);

module.exports = router;