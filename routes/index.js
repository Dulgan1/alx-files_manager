const express = require('express');
const AppController = require('../controllers/AppController');
const UserController = require('../controller/UserController');

const router = express.Router();

router.get('/status', AppController.getStatus);
router.get('/stats', AppController.getStats);
router.post('/users', UserController.postNew);

module.exports = router;
