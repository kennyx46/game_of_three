import { all } from 'redux-saga/effects';

import gameSaga from './games/sagas';


export default function* rootSaga() {
    yield all([gameSaga()]);
}
