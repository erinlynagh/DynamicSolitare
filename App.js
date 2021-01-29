import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PlayingCard from './JS/PlayingCard';
import CardDeck from './JS/CardDeck';
import { Container, Row, Col, Jumbotron, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      gameStarted: 0,
      matchingCards: 0,
      discard: [],
      deckRed: ['AD', '2D', '3D', '4D', '5D', '6D', '7D', '8D', 'AH', '2H', '3H', '4H', '5H', '6H', '7H', '8H'],
      tableau1: [],
      tableau2: [],
      tableau3: [],
      tableau4: [],
      deckBlack: ['AC', '2C', '3C', '4C', '5C', '6C', '7C', '8C', 'AS', '2S', '3S', '4S', '5S', '6S', '7S', '8S'],
      deck1: ['9H', '10C', 'JH', 'QC', 'KH'],
      deck2: ['9C', '10H', 'JC', 'QH', 'KC'],
      deck3: ['9D', '10S', 'JD', 'QS', 'KD'],
      deck4: ['9S', '10D', 'JS', 'QD', 'KS'],
      red1: [],
      red2: [],
      red3: [],
      red4: [],
      black1: [],
      black2: [],
      black3: [],
      black4: []
    }
  }

  startGame() {
    this.shuffleDeck(this.state.deckRed)
    this.shuffleDeck(this.state.deckBlack)
    this.moveCard('deckRed', 'red1')
    this.moveCard('deckRed', 'red2')
    this.moveCard('deckRed', 'red3')
    this.moveCard('deckRed', 'red4')
    this.moveCard('deckBlack', 'black1')
    this.moveCard('deckBlack', 'black2')
    this.moveCard('deckBlack', 'black3')
    this.moveCard('deckBlack', 'black4')
    this.setState({
      gameStarted: 1
    })
  }

  moveCard(to, from) {
    var deck1 = this.state[to];
    var deck2 = this.state[from];
    var card = ''
    if (!(deck1 === undefined && deck1.length === 0)) {
      card = deck1[0];
      deck1.splice(0, 1)
      deck2.unshift(card)
    }
    this.setState({
      [to]: deck1,
      [from]: deck2
    })
  }

  dealCards() {
    console.log('lol')
  }

  matchCards() {
    this.setState({
      matchingCards: 1
    })
  }

  shuffleDeck(array) {
    //find the deck that matches the passed in array
    for (const [key, value] of Object.entries(this.state)) {
      if (value == array) {
        var deckName = key
      }
    }
    //shuffle
    for (let i = array.length - 1; i > 0; i--) {
      const rand = Math.floor(Math.random() * (i + 1));
      [array[i], array[rand]] = [array[rand], array[i]];
    }
    //replace the matching array, update the state
    this.setState({
      [deckName]: array
    })
  }

  addCard(card, deck) {
    deck.push(card);
  }

  render() {
    return (
      <Container align="center">
        <Jumbotron>
          <h1>Cards</h1>
        </Jumbotron>
        <Row className="mb-5">
          <Col>
            <CardDeck cards={this.state.discard} />
          </Col>
          <Col>
            <CardDeck cards={this.state.deckRed} />
          </Col>
          <Col>
            <CardDeck cards={this.state.tableau1} />
          </Col>
          <Col>
            <CardDeck cards={this.state.tableau2} />
          </Col>
          <Col>
            <CardDeck cards={this.state.tableau3} />
          </Col>
          <Col>
            <CardDeck cards={this.state.tableau4} />
          </Col>
          <Col>
            <CardDeck cards={this.state.deckBlack} />
          </Col>
        </Row>
        <Row className="mb-2">
          <Col>
            <CardDeck cards={this.state.deck1} />
          </Col>
          <Col>
            <CardDeck cards={this.state.deck2} />
          </Col>
          <Col>
            <CardDeck cards={this.state.red1} />
          </Col>
          <Col>
            <CardDeck cards={this.state.red2} />
          </Col>
          <Col>
            <CardDeck cards={this.state.red3} />
          </Col>
          <Col>
            <CardDeck cards={this.state.red4} />
          </Col>
          <Col>Score1</Col>
        </Row>
        <Row className="mb-2">
          <Col>
            <CardDeck cards={this.state.deck3} />
          </Col>
          <Col>
            <CardDeck cards={this.state.deck4} />
          </Col>
          <Col>
            <CardDeck cards={this.state.black1} />
          </Col>
          <Col>
            <CardDeck cards={this.state.black2} />
          </Col>
          <Col>
            <CardDeck cards={this.state.black3} />
          </Col>
          <Col>
            <CardDeck cards={this.state.black4} />
          </Col>
          <Col>Score2</Col>
        </Row>
        <Row>
          {this.state.gameStarted
            ? <Container>
              <Button className="btn btn-block" onClick={() => this.dealCards()}>Deal</Button>
              <Button className="btn btn-block" onClick={() => this.matchCards()}>Create Match</Button>
            </Container>
            : <Button className="btn btn-block" onClick={() => this.startGame()}>Start Game</Button>
          }
        </Row>
      </Container>
    );
  }
}

export default App;