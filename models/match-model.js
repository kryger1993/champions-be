const mongoose = require('mongoose');
const validator = require('validator');

const matchSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: [true, 'A match must have a date']
  },
  teamA: {
    type: [mongoose.Schema.Types.ObjectId],
    refs: 'Player',
    validate: {
      validator: function (val) {
        return val.length === 5;
      },
      message: 'A match must have 5 players in the first team'
    }
  },
  teamB: {
    type: [mongoose.Schema.Types.ObjectId],
    refs: 'Player',
    validate: {
      validator: function (val) {
        return val.length === 5;
      },
      message: 'A match must have 5 players in the first team'
    }
  },
  result: {
    firstTeam: {
      type: Number,
      default: 0
    },
    secondTeam: {
      type: Number,
      default: 0
    }
  },
  goals: [{
    scorer: {
      type: mongoose.Schema.Types.ObjectId,
      refs: 'Player',
      required: [true, 'A goal must have a scorer'],
      isOwnGoal: {
        type: Boolean,
        default: false
      }
    },
    assist: {
      type: mongoose.Schema.Types.ObjectId,
      refs: 'Player'
    },
    team: {
      type: String,
      enum: ['teamA', 'teamB'],
      required: true
    },
    againstGK: {
      type: mongoose.Schema.Types.ObjectId,
      refs: 'Player',
      required: [true]
    }
  }]
});

// TODO middlewares

const Player = mongoose.model('Player', matchSchema);

module.exports = Player;