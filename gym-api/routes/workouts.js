const express = require('express');
const router = express.Router();
const workoutsController = require('../controllers/workouts');
const validation = require('../middleware/validate');

router.get('/', workoutsController.getAll);
router.post('/', validation.saveWorkout, workoutsController.createWorkout);
router.get('/:id', workoutsController.getSingle);
router.put('/:id', validation.saveWorkout, workoutsController.updateWorkout);
router.delete('/:id', workoutsController.deleteWorkout);

module.exports = router;