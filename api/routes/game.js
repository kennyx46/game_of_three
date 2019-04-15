var express = require('express');
var guid = require('../utils/guid');
const Game = require('../models/Game');
var router = express.Router();

router.post('/', async(req, res) => {
    try {
        const user1Id = guid();
        const defaultGame = { status: 'created', user1Id, currentUserIdMove: user1Id };
        const [game, isCreated] = await Game.findOrCreate({ where: { status: 'created' }, defaults: defaultGame });
        if (!isCreated) {
            game.status = 'started';
            game.user2Id = guid();
            await game.save();
        }
        res.json({ game });
    } catch(error) {
        res.status(400).json({ error });
    }
})

// polling for status
router.get('/:id', async (req, res) => {
    try {
        const gameId = req.params.id;
        const game = await Game.findByPk(gameId);
        if (!game) {
            res.status(404).json({ error: 'no such game' });
            return;
        }
        res.json({ game });
    } catch (error) {
        res.status(400).json({ error: 'smth bad happened' });
    }
})

router.post('/:id/move', async (req, res) => {
    try {
        const gameId = req.params.id;
        const { userId, number } = req.body;
        const game = await Game.findByPk(gameId);

        if (!game) {
            res.status(404).json({ error: 'no such game' });
            return;
        }

        // disallow two moves in a row
        if (game.activeNumber && game.currentUserIdMove !== userId) {
            res.json({ error: 'two moves in a row' });
            return;
        }

        if (isNaN(parseFloat(number))) {
            res.status(400).json({ error: 'invalid number'});
            return;
        }

        if (!game.activeNumber) {
          game.activeNumber = number;
        } else {
          game.activeNumber = number / 3;
          if (game.activeNumber === 1) {
              game.status = 'finished';
              await game.save();
              res.json({ game });
              return;
          }
        }
        game.currentUserIdMove = game.user1Id === userId ? game.user2Id : game.user1Id;
        await game.save();
        res.json({ game });
    } catch (error) {
        res.status(400).json({ error: 'smth bad happened' });
    }
});

module.exports = router;
