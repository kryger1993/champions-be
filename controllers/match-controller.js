const Match = require('../models/match-model');
const factory = require('./handler-factory');

exports.createMatch = factory.createOne(Match);
exports.getMatch = factory.getOne(Match);
exports.getAllMatch = factory.getAll(Match);
exports.updateMatch = factory.updateOne(Match);
exports.deleteMatch = factory.deleteOne(Match);