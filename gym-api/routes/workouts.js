const express = require('express');
const router = express.Router();
const workoutsController = require('../controllers/workouts');
const validation = require('../middleware/validate');
const { requiresAuth } = require('express-openid-connect');

router.get('/', workoutsController.getAll);
router.get('/:id', workoutsController.getSingle);

router.post('/', requiresAuth(), validation.saveWorkout, workoutsController.createWorkout);
router.put('/:id', requiresAuth(), validation.saveWorkout, workoutsController.updateWorkout);
router.delete('/:id', requiresAuth(), workoutsController.deleteWorkout);

module.exports = router;