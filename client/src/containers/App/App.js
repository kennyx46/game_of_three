import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.css';

import GameScreen from '../../components/GameScreen';
import MoveChoiceItem from '../../components/MoveChoiceItem';
import { DIVISION_REMAINDER_OPERATIONS, OPERATIONS } from '../../constants';

const initialState = {
  value: '',
  isAutoplay: false,
  operation: null,
}

class App extends Component {

  state = initialState;

  startGame = async () => {
    this.props.startGame();
  }

  startClearGame = () => {
    // this.setState(initialState, { isAutoplay: this.state.isAutoplay });
    this.forceUpdate();
    this.props.startGame();
  }

  sendNumber = async () => {
    const { value, operation } = this.state;
    const { game } = this.props;
    const number = game.activeNumber ? OPERATIONS[operation](game.activeNumber) : value;

    this.props.makeMove(number);
  }

  componentDidUpdate(prevProps, prevState) {;
    if (this.state !== prevState) return;

    const { game, isAwaitingForSecondUser, requiredOperation } = this.props;
    if (game && game.status === 'started' && !isAwaitingForSecondUser && this.state.isAutoplay) {
      if (!game.activeNumber) {
        this.setState({ value: Math.round(Math.random() * 100) });
        setTimeout(() => {
          this.sendNumber();
        }, 1000);
      } else {
        this.setState({ operation: requiredOperation });
        setTimeout(() => {
          this.sendNumber();
        }, 1000);
      }
    }
    // if (game && game.status === 'finished') {
    //   this.setState({ isAutoplay: false });
    // }
  }

  render() {
    const { operation, isAutoplay } = this.state;
    const { isGameStarted, isAwaitingForSecondUser, isWinner, isFinished, requiredOperation, game } = this.props;

    if (!isGameStarted) {
      return (
        <GameScreen header="Want to play?">
          <Button block onClick={this.startGame}>Start game</Button>
          <Form.Check
            name="autoplay"
            label="Autoplay"
            onChange={() => this.setState({ isAutoplay: !isAutoplay })}
            value={isAutoplay}
            id="autoplay"
          />
        </GameScreen>
      );
    }

    if (isAwaitingForSecondUser) {
      return (
        <GameScreen header="Waiting for second user move">
          <Spinner animation="border" role="status"/>
        </GameScreen>
      );
    }

    if (isFinished) {
      return (
        <GameScreen header={isWinner ? 'You won!' : 'You loose(('}>
          <Button block onClick={this.startClearGame}>Rerun game</Button>
        </GameScreen>
      );
    }

    if (!game.activeNumber) {
      return (
        <GameScreen header="welcome to the game">
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <Button variant="outline-secondary" onClick={this.sendNumber}>Send</Button>
            </InputGroup.Prepend>
            <FormControl aria-describedby="initialValue" value={this.state.value}
                disabled={isAutoplay}
                onChange={(e) => this.setState({ value: parseInt(e.target.value)})}/>
          </InputGroup>
        </GameScreen>
      );
    }

    return (
      <GameScreen header="welcome to the game">
          <Alert variant="primary">
            {game.activeNumber}
          </Alert>

          {DIVISION_REMAINDER_OPERATIONS.map((value) => {
            return <MoveChoiceItem value={value} key={value}
                isInvalid={operation === value && requiredOperation !== value}
                checked={operation === value}
                disabled={isAutoplay}
                onChange={ ({ value }) => this.setState({ operation: value }) } />
          })}

          <Button block disabled={!operation || operation !== requiredOperation} onClick={this.sendNumber}>send</Button>
      </GameScreen>
    )
  }
}

export default App;
