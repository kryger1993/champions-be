const express = require('express');
const matchController = require('../controllers/match-controller');

const router = express.Router();

router.get('/', matchController.getAllMatch);

router.post('/create', matchController.createMatch);

router
  .route('/:id')
  .get(matchController.getMatch)
  .patch(matchController.updateMatch);

module.exports = router;