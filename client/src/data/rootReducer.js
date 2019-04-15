import { combineReducers } from 'redux';

import games from './games/reducer';

const createRootReducer = () => combineReducers({
    games
});

export default createRootReducer;
