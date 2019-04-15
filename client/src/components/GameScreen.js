import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';

const GameScreen = ({ header, children}) => {
  return (
    <Jumbotron>
      <Container>
        <h1>{header}</h1>
        {children}
      </Container>
    </Jumbotron>
  );
};

export default GameScreen;
