const mongoose = require('mongoose');
const catchAsync = require('../utils/catch-async');
const validator = require('validator');
const Player = require('./player-model');

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
      message: 'A match must have 5 players in the second team'
    }
  },
  result: {
    teamA: {
      type: Number,
      default: 0
    },
    teamB: {
      type: Number,
      default: 0
    }
  },
  goals: [{
    scorer: {
      type: mongoose.Schema.Types.ObjectId,
      refs: 'Player',
      required: [true, 'A goal must have a scorer']
    },
    isOwnGoal: {
      type: Boolean,
      default: false
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

matchSchema.pre('save', function (next) {
  if (this.goals.length > 0) {
    let teamAGoals = getGoals(this.goals, 'teamA');
    let teamBGoals = getGoals(this.goals, 'teamB');
    let teamAOwnGoals = getOwnGoals(this.goals, 'teamA');;
    let teamBOwnGoals = getOwnGoals(this.goals, 'teamB');

    // calculate the result
    this.result.teamA = teamAGoals.length + teamBOwnGoals.length;
    this.result.teamB = teamBGoals.length + teamAOwnGoals.length;
  }

  next();
});

matchSchema.post('save', async function (doc, next) {
  // increment Matches Played
  for (const player of doc.teamA.concat(doc.teamB)) {
    await Player.findByIdAndUpdate(player, { $inc: { matchesPlayed: 1 } });
  }

  for (const goal of doc.goals) {
    // update goals
    if (!goal.isOwnGoal) {
      await Player.findByIdAndUpdate(goal.scorer, { $inc: { goal: 1 } });
    } else {
      // update own goal
      await Player.findByIdAndUpdate(goal.scorer, { $inc: { ownGoal: 1 } });
    }

    // update assist
    if (goal.assist) {
      await Player.findByIdAndUpdate(goal.assist, { $inc: { assist: 1 } });
    }

    // update goals taken
    await Player.findByIdAndUpdate(goal.againstGK, { $inc: { goalConceded: 1 } });
  }

  next();
});

function getGoals(goals, team) {
  return goals.filter(goal => goal.team == team && !goal.isOwnGoal);
}

function getOwnGoals(goals, team) {
  return goals.filter(goal => goal.team == team && goal.isOwnGoal);
}

const Match = mongoose.model('Match', matchSchema);

module.exports = Match;