const Player = require('../models/player-model');
const factory = require('./handler-factory');
const catchAsync = require('../utils/catch-async');

exports.createPlayer = factory.createOne(Player);
exports.getPlayer = factory.getOne(Player);
exports.getAllPlayer = factory.getAll(Player);
exports.uptadePlayer = factory.updateOne(Player);
exports.deletePlayer = factory.deleteOne(Player);

exports.resetStats = catchAsync(async (req, res, next) => {
  await Player.updateOne({ _id: req.params.id }, { goal: 0, ownGoal: 0, assist: 0, goalConceded: 0, matchesPlayed: 0 });

  res.status(204).json({
    status: 'success'
  });
});

exports.resetAllPlayersStats = catchAsync(async (req, res, next) => {
  await Player.updateMany({}, { goal: 0, ownGoal: 0, assist: 0, goalConceded: 0, matchesPlayed: 0 });

  res.status(204).json({
    status: 'success'
  });
});