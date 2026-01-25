const router = require('express').Router();

router.use('/', require('./swagger'));
router.get('/', (req, res) => { res.send('Gym Fitness API'); });

router.use('/workouts', require('./workouts'));
router.use('/trainers', require('./trainers'));

module.exports = router;