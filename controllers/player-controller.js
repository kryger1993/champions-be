const Player = require('../models/player-model');

exports.createPlayer = async (req, res) => {
  // TODO create player
  console.log('function create player - req: ', req.body);

  const doc = await Player.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      data: doc
    }
  });
};

exports.getPlayer = (req, res) => {
  // TODO get player
  console.log('function get player - req: ', req.body);
  res.status(200);
};

exports.uptadePlayer = (req, res) => {
  // TODO update player
  console.log('function update player - req: ', req.body);
  res.status(200);
};

exports.deletePlayer = (req, res) => {
  // TODO delete player
  console.log('function delete player - req: ', req.body);
  res.status(200);
};
