const express = require('express');
const playerController = require('../controllers/player-controller');

const router = express.Router();

router.post('/create', playerController.createPlayer);

module.exports = router;