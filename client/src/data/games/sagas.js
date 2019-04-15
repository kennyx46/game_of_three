import { all, takeEvery, put, call, select, delay, } from 'redux-saga/effects';

import { GAMES } from '../actionTypes';
import actions from './actions';
import api from '../../services/api';
import { DIVISION_REMAINDER_OPERATIONS, OPERATIONS } from '../../constants';

function* startGame() {
    try {
        const game = yield call(api.startGame);
        let userId = game.status === 'created' ? game.user1Id : game.user2Id;

        yield put(actions.startGameSuccess({ game, isGameStarted: true, userId, isAwaitingForSecondUser: true, }));

        yield call(pollGame, game);

    } catch (error) {
        yield put(actions.startGameError(error));
    }
}

// function* getGame(action) {
//     try {
//         const game = yield call(api.getGame, action.payload.questionId);
//         yield put(actions.getGameSuccess(game));
//     } catch (error) {
//         yield put(actions.getGameError(error));
//     }
// }

function* makeMove(action) {
    try {
        const games = yield select((state) => state.games);
        const game = yield call(api.makeMove, games.game, { userId: games.userId, number: action.payload.number });

        yield put(actions.makeMoveSuccess({ game, isAwaitingForSecondUser: true, requiredOperation: null, operation: null }));

        yield call(pollGame, game);
    } catch (error) {
      console.log('errrr');
        yield put(actions.makeMoveError(error));
    }
}

function* pollGame(game) {
    const { userId } = yield select((state) => state.games);
    while (true) {
      const newGame = yield call(api.getGame, game.id);
      if (newGame.status === 'started' && newGame.currentUserIdMove === userId) {
        const requiredOperation = DIVISION_REMAINDER_OPERATIONS[newGame.activeNumber % 3]
        yield put(actions.getGameSuccess({ isAwaitingForSecondUser: false, game: newGame, requiredOperation }));

        if (game.isAutoplay && newGame.activeNumber) {
          const operation = requiredOperation;
          yield delay(2000);
          const number = OPERATIONS[operation](game.activeNumber);
          yield put(actions.makeMove({ payload: { number }}));
        }
        return;
      }

      if (newGame.status === 'finished') {
        const isWinner = newGame.currentUserIdMove === userId;

        yield put(actions.getGameSuccess({ isWinner, game: newGame, isFinished: true, isAwaitingForSecondUser: false }));
        return;
      }

      yield delay(1000);
    }
}


export default function* questionsSaga() {
    yield all([
        takeEvery(GAMES.START_GAME_REQUEST, startGame),
        takeEvery(GAMES.MAKE_MOVE_REQUEST, makeMove),
    ]);
}
