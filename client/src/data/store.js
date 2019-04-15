import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import createRootReducer from './rootReducer';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

const store = createStore(
	createRootReducer(),
	compose(applyMiddleware(...middlewares)));

sagaMiddleware.run(rootSaga);

export default store;
