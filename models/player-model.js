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
  matchesPlayed: {
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
    default: 0,
    min: 0,
    max: 100,
    validate: {
      validator: function (val) {
        return val <= 100 && val >= 0;
      },
      message: 'The total average power must be between 0 and 100'
    }
  },
  attackPower: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
    validate: {
      validator: function (val) {
        return val <= 100 && val >= 0;
      },
      message: 'The total average power must be between 0 and 100'
    }
  },
  defensePower: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
    validate: {
      validator: function (val) {
        return val <= 100 && val >= 0;
      },
      message: 'The total average power must be between 0 and 100'
    }
  },
  playmakerPower: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
    validate: {
      validator: function (val) {
        return val <= 100 && val >= 0;
      },
      message: 'The total average power must be between 0 and 100'
    }
  },
  physiquePower: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
    validate: {
      validator: function (val) {
        return val <= 100 && val >= 0;
      },
      message: 'The total average power must be between 0 and 100'
    }
  },
  mindfulnessPower: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
    validate: {
      validator: function (val) {
        return val <= 100 && val >= 0;
      },
      message: 'The total average power must be between 0 and 100'
    }
  }
});

// TODO middlewares

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;