const express = require('express');
const playerController = require('../controllers/player-controller');

const router = express.Router();

router.get('/', playerController.getAllPlayer);

router.post('/create', playerController.createPlayer);

router
  .route('/reset-all-stats')
  .patch(playerController.resetAllPlayersStats);

router
  .route('/:id')
  .get(playerController.getPlayer)
  .patch(playerController.uptadePlayer);

router
  .route('/:id/reset-stats')
  .patch(playerController.resetStats);

module.exports = router;