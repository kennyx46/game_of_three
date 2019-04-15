import { GAMES } from '../actionTypes';

export const startGame = () => ({
    type: GAMES.START_GAME_REQUEST,
});

export const startGameSuccess = ({ game, isGameStarted, userId, isAwaitingForSecondUser }) => ({
    type: GAMES.START_GAME_SUCCESS,
    payload: { game, isGameStarted, userId, isAwaitingForSecondUser }
});

export const startGameError = () => ({
    type: GAMES.START_GAME_ERROR,
});

export const getGame = () => ({
    type: GAMES.GET_GAME_REQUEST,
});

export const getGameSuccess = ({ game, requiredOperation, isAwaitingForSecondUser, isWinner, isFinished }) => ({
    type: GAMES.GET_GAME_SUCCESS,
    payload: { game, requiredOperation, isAwaitingForSecondUser, isWinner, isFinished }
});

export const getGameError = () => ({
    type: GAMES.GET_GAME_ERROR,
});


export const makeMove = (number) => ({
    type: GAMES.MAKE_MOVE_REQUEST,
    payload: { number },
});

export const makeMoveSuccess = ({ game, isAwaitingForSecondUser, requiredOperation, operation }) => ({
    type: GAMES.MAKE_MOVE_SUCCESS,
    payload: { game, isAwaitingForSecondUser, requiredOperation, operation },
});

export const makeMoveError = () => ({
    type: GAMES.MAKE_MOVE_ERROR,
});


export default {
    startGame,
    startGameSuccess,
    startGameError,

    makeMove,
    makeMoveSuccess,
    makeMoveError,

    getGame,
    getGameSuccess,
    getGameError,
}
