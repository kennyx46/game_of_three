import { GAMES } from '../actionTypes';

export const initialState = {
    game: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GAMES.START_GAME_REQUEST:
            return {
                ...state,
            }
        case GAMES.START_GAME_SUCCESS:
            return {
                ...state,
                ...action.payload,
            }
        case GAMES.START_GAME_ERROR:
            return {
                ...state,
                error: action.payload.error,
            }
        case GAMES.GET_GAME_REQUEST:
            return {
                ...state,
            }
        case GAMES.GET_GAME_SUCCESS:
            return {
                ...state,
                ...action.payload,
            }
        case GAMES.GET_GAME_ERROR:
            return {
                ...state,
                error: action.payload.error,
            }
        case GAMES.MAKE_MOVE_SUCCESS:
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state;
    }
};
