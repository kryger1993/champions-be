const mongoose = require('mongoose');
const validator = require('validator');

const playerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A playre must have a name'],
    trim: true
  },
  surname: {
    type: String,
    required: [true, 'A player must have a surname'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'A player must have an e-mail'],
    trim: true,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid e-mail']
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'super-admin'],
    default: 'user'
  },
  attendance: {
    type: Number,
    default: 0
  },
  goal: {
    type: Number,
    default: 0
  },
  assist: {
    type: Number,
    default: 0
  },
  goalConceded: {
    type: Number,
    default: 0
  },
  ownGoal: {
    type: Number,
    default: 0
  },
  totAvgPower: {
    type: Number,
    default: 0
  },
  attackPower: {
    type: Number,
    default: 0
  },
  defensePower: {
    type: Number,
    default: 0
  },
  playmakerPower: {
    type: Number,
    default: 0
  },
  physiquePower: {
    type: Number,
    default: 0
  },
  mindfulnessPower: {
    type: Number,
    default: 0
  }
});

// TODO middlewares

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;