const router = require('express').Router();
const { requiresAuth } = require('express-openid-connect');

router.use('/', require('./swagger'));
router.get('/', (req, res) => { 
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out'); 
});

router.use('/workouts', require('./workouts'));

router.use('/trainers', require('./trainers'));

module.exports = router;