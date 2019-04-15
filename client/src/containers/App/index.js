import { connect } from 'react-redux';

import { startGame, makeMove } from '../../data/games/actions';

import App from './App';

const mapStateToProps = (state) => ({
    game: state.games.game,
    isGameStarted: state.games.isGameStarted,
    userId: state.games.userId,
    isAwaitingForSecondUser: state.games.isAwaitingForSecondUser,
    activeNumber: state.games.activeNumber,
    requiredOperation: state.games.requiredOperation,
    isWinner: state.games.isWinner,
	isFinished: state.games.isFinished,
});

const mapDispatchToProps = {
    startGame,
    makeMove,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
