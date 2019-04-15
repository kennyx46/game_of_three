const Sequelize = require('sequelize');
const sequelize = require('./db');


const Game = sequelize.define('game', {
  user1Id: {
    type: Sequelize.UUID,
  },
  user2Id: {
    type: Sequelize.UUID
  },
  currentUserIdMove: {
    type: Sequelize.UUID,
  },
  activeNumber: {
    type: Sequelize.INTEGER,
  },
  status: {
    type: Sequelize.ENUM('created', 'started', 'finished'),
    defaultValue: 'created',
  }
});


module.exports = Game;
