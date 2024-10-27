const express = require('express');
const playerController = require('../controllers/player-controller');

const router = express.Router();

router.get('/', playerController.getAllPlayer);

router.post('/create', playerController.createPlayer);

router
  .route('/:id')
  .get(playerController.getPlayer)
  .patch(playerController.uptadePlayer);

module.exports = router;