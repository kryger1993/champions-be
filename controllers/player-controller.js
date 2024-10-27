const Player = require('../models/player-model');
const factory = require('./handler-factory');

exports.createPlayer = factory.createOne(Player);
exports.getPlayer = factory.getOne(Player);
exports.uptadePlayer = factory.updateOne(Player);
exports.deletePlayer = factory.deleteOne(Player);
